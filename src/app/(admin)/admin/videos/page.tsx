"use client";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "@/app/(admin)/admin/components/Sidebar";
import { Menu, Upload, Trash2, Edit3 } from "lucide-react";

/**
 * Final Admin Upload page (TypeScript-safe)
 *
 * - 8 slot preview bar
 * - drag & drop thumbnail + thumbnail preview
 * - select video + video preview
 * - capture frame from video to use as thumbnail
 * - upload progress + toasts
 * - smaller height for slots 5-8 on landscape
 * - remove video support (uses header x-remove-video: 1 on PUT)
 */

type Slot = {
  slotId: number;
  title?: string;
  description?: string;
  category?: string;
  thumbnailUrl?: string | null;
  videoUrl?: string | null;
  type?: "portrait" | "landscape";
};

type Toast = {
  id: number;
  type: "success" | "error" | "info";
  message: string;
};

export default function UploadForm() {
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotId, setSlotId] = useState<number>(1);

  // form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);

  // preview URLs
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(
    null
  );
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);

  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastCounter = useRef(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const thumbInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);

  // drag state
  const [isDragging, setIsDragging] = useState(false);

  // inject small CSS for landscape small slots (cleanup on unmount)
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @media (orientation: landscape) {
        .slot-small { min-height: 78px !important; height: 78px !important; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (style.parentNode) style.parentNode.removeChild(style);
    };
  }, []);

  // fetch slots on mount
  useEffect(() => {
    fetchSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchSlots() {
    try {
      const res = await fetch("/api/videos", { credentials: "same-origin" });
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data)) setSlots(data);
    } catch (err) {
      console.warn("Failed to fetch slots", err);
    }
  }

  // when selected slot changes populate metadata & previews
  useEffect(() => {
    const s = slots.find((x) => x.slotId === slotId);
    if (s) {
      setTitle(s.title || "");
      setDescription(s.description || "");
      setCategory(s.category || "");
      setThumbnailFile(null);
      setVideoFile(null);
      setThumbnailPreviewUrl(s.thumbnailUrl || null);
      setVideoPreviewUrl(s.videoUrl || null);
      setProgress(0);
    } else {
      setTitle("");
      setDescription("");
      setCategory("");
      setThumbnailFile(null);
      setVideoFile(null);
      setThumbnailPreviewUrl(null);
      setVideoPreviewUrl(null);
      setProgress(0);
    }
  }, [slotId, slots]);

  function addToast(type: Toast["type"], message: string) {
    const id = ++toastCounter.current;
    const t: Toast = { id, type, message };
    setToasts((s) => [t, ...s]);
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 3500);
  }

  // revoke object URLs when component unmounts or when a new preview is set
  const lastThumbUrlRef = useRef<string | null>(null);
  const lastVideoUrlRef = useRef<string | null>(null);
  useEffect(() => {
    // revoke previous thumbnail if it was an object URL (we create them from File)
    if (
      lastThumbUrlRef.current &&
      lastThumbUrlRef.current !== thumbnailPreviewUrl
    ) {
      try {
        URL.revokeObjectURL(lastThumbUrlRef.current);
      } catch {}
    }
    lastThumbUrlRef.current = thumbnailPreviewUrl;
    // same for video
    if (
      lastVideoUrlRef.current &&
      lastVideoUrlRef.current !== videoPreviewUrl
    ) {
      try {
        URL.revokeObjectURL(lastVideoUrlRef.current);
      } catch {}
    }
    lastVideoUrlRef.current = videoPreviewUrl;

    return () => {
      if (lastThumbUrlRef.current) {
        try {
          URL.revokeObjectURL(lastThumbUrlRef.current);
        } catch {}
      }
      if (lastVideoUrlRef.current) {
        try {
          URL.revokeObjectURL(lastVideoUrlRef.current);
        } catch {}
      }
    };
  }, [thumbnailPreviewUrl, videoPreviewUrl]);

  // drag & drop handlers for thumbnail area (attach listeners to dropRef)
  useEffect(() => {
    const node = dropRef.current;
    if (!node) return;

    const onDragOver = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };
    const onDragLeave = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };
    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = e.dataTransfer?.files;
      if (!files || files.length === 0) return;
      handleThumbnailFile(files[0]);
    };

    // add listeners
    node.addEventListener("dragover", onDragOver as EventListener);
    node.addEventListener("dragleave", onDragLeave as EventListener);
    node.addEventListener("drop", onDrop as EventListener);

    return () => {
      node.removeEventListener("dragover", onDragOver as EventListener);
      node.removeEventListener("dragleave", onDragLeave as EventListener);
      node.removeEventListener("drop", onDrop as EventListener);
    };
  }, []);

  // helper: set thumbnail file and preview
  function handleThumbnailFile(f: File | null) {
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      addToast("error", "Thumbnail must be an image.");
      return;
    }
    setThumbnailFile(f);
    const url = URL.createObjectURL(f);
    setThumbnailPreviewUrl(url);
  }

  // helper: set video file and preview
  function handleVideoFile(f: File | null) {
    if (!f) return;
    if (!f.type.startsWith("video/")) {
      addToast("error", "Please choose a valid video file.");
      return;
    }
    setVideoFile(f);
    const url = URL.createObjectURL(f);
    setVideoPreviewUrl(url);
  }

  // capture a frame from the loaded video and set as thumbnailFile
  const captureFrameAsThumbnail = async () => {
    try {
      const vid = videoRef.current;
      if (!vid) {
        addToast("error", "Load video first to capture frame.");
        return;
      }

      // ensure some data is loaded
      if (vid.readyState < 2) {
        await new Promise<void>((res) => {
          const handler = () => res();
          vid.addEventListener("loadeddata", handler, { once: true });
          // fallback timeout
          setTimeout(res, 1200);
        });
      }

      // try to seek to 0.8s (if duration allows)
      const seekTime = Math.min(1, vid.duration || 0);
      try {
        vid.currentTime = seekTime;
        await new Promise<void>((res) => {
          const handler = () => res();
          vid.addEventListener("seeked", handler, { once: true });
          setTimeout(res, 900);
        });
      } catch {
        // ignore seek errors; proceed to draw current frame
      }

      const canvas = document.createElement("canvas");
      const vw = vid.videoWidth || 640;
      const vh = vid.videoHeight || 360;
      const targetW = Math.min(1280, vw);
      const scale = targetW / vw;
      canvas.width = targetW;
      canvas.height = Math.round(vh * scale);

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("2D context not available");
      ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `thumb-slot-${slotId}.jpg`, {
        type: "image/jpeg",
      });

      handleThumbnailFile(file);
      addToast("success", "Captured thumbnail from video");
    } catch (err) {
      console.error(err);
      addToast("error", "Could not capture frame");
    }
  };

  async function handleRemoveVideo(e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    if (
      !confirm(
        "Remove video from slot? This will only remove the file on the server."
      )
    )
      return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/videos/${slotId}`, {
        method: "PUT",
        credentials: "same-origin",
        headers: { "x-remove-video": "1" },
        body: new FormData(),
      });
      if (!res.ok) {
        const text = await res.text();
        addToast("error", `Remove failed: ${text}`);
      } else {
        addToast("success", "Video removed");
        await fetchSlots();
      }
    } catch (err: any) {
      addToast("error", String(err.message || err));
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();

    if (!videoFile && !thumbnailFile && !title && !description && !category) {
      addToast("info", "Make some changes before uploading.");
      return;
    }

    setLoading(true);
    setProgress(0);

    const fd = new FormData();
    if (videoFile) fd.append("video", videoFile);
    if (thumbnailFile) fd.append("thumbnail", thumbnailFile);
    fd.append("title", title);
    fd.append("description", description);
    fd.append("category", category);
    const type = slotId <= 4 ? "portrait" : "landscape";
    fd.append("type", type);

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `/api/admin/videos/${slotId}`);
    xhr.withCredentials = true;

    xhr.upload.onprogress = (ev) => {
      if (ev.lengthComputable)
        setProgress(Math.round((ev.loaded / ev.total) * 100));
    };

    xhr.onload = async () => {
      setLoading(false);
      setProgress(0);
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          JSON.parse(xhr.responseText || "{}");
          addToast("success", "Upload successful");
          await fetchSlots();
          setThumbnailFile(null);
          setVideoFile(null);
          setTitle("");
          setDescription("");
          setCategory("");
          setThumbnailPreviewUrl(null);
          setVideoPreviewUrl(null);
        } catch {
          addToast("success", "Upload successful");
          await fetchSlots();
        }
      } else {
        const errText = xhr.responseText || `Status ${xhr.status}`;
        addToast("error", `Upload failed: ${errText}`);
      }
    };

    xhr.onerror = () => {
      setLoading(false);
      setProgress(0);
      addToast("error", "Network error during upload");
    };

    xhr.send(fd);
  }

  const selectedSlot = slots.find((s) => s.slotId === slotId) || null;
  const toggleSidebar = () => setSidebarOpen((s) => !s);

  const openThumbPicker = () => thumbInputRef.current?.click();
  const openVideoPicker = () => videoInputRef.current?.click();

  function SlotTile({ s }: { s: Slot }) {
    const hasVideo = !!s.videoUrl;
    const smallClass = s.slotId >= 5 ? "slot-small" : "";
    return (
      <button
        type="button"
        onClick={() => setSlotId(s.slotId)}
        className={`relative flex-shrink-0 w-28 h-40 sm:w-32 sm:h-44 rounded-xl overflow-hidden border-2
          transition-transform transform hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2
          ${s.slotId === slotId ? "ring-2 ring-indigo-500" : ""} 
          ${
            hasVideo ? "border-emerald-500" : "border-gray-700"
          } bg-gray-900 ${smallClass}`}
        aria-pressed={s.slotId === slotId}
        title={`Slot ${s.slotId} ${s.title ? "- " + s.title : ""}`}
      >
        <div className="w-full h-full">
          <img
            src={s.thumbnailUrl || "/favicon.ico"}
            alt={s.title || `Slot ${s.slotId}`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(ev) => {
              (ev.target as HTMLImageElement).src = "/favicon.ico";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-2 left-2 right-2 text-xs text-white flex items-center justify-between">
            <div className="truncate pr-2">{s.title || `Slot ${s.slotId}`}</div>
            {hasVideo && (
              <div className="text-emerald-300 font-bold text-xs px-2 py-0.5 bg-emerald-900/30 rounded">
                ✓
              </div>
            )}
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="lg:hidden text-gray-300">
              <Menu size={26} />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Video Slots — Admin
            </h1>
            <div className="ml-4 text-sm text-gray-400">
              Selected slot: {slotId}
            </div>
            {selectedSlot?.type && (
              <div className="ml-3 text-xs px-2 py-1 rounded bg-gray-800 text-gray-300">
                {selectedSlot.type}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3" />
        </header>

        <section className="mb-6">
          <div className="flex gap-3 overflow-x-auto py-2 px-1">
            {Array.from({ length: 8 }).map((_, i) => {
              const s = slots.find((x) => x.slotId === i + 1) || {
                slotId: i + 1,
                title: `Slot ${i + 1}`,
                thumbnailUrl: undefined,
                videoUrl: undefined,
                type: i < 4 ? "portrait" : "landscape",
              };
              return <SlotTile key={i} s={s} />;
            })}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-black rounded-lg p-6 shadow">
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                  Upload / Replace Slot {slotId}
                </h2>

                <div className="flex items-center gap-2">
                  {selectedSlot?.videoUrl && (
                    <button
                      type="button"
                      onClick={handleRemoveVideo}
                      className="text-sm text-red-400 hover:text-red-300 flex items-center gap-2 px-3 py-1 rounded bg-gray-800"
                    >
                      <Trash2 size={14} /> Remove Video
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded font-semibold ${
                      loading
                        ? "bg-emerald-600/80 text-white"
                        : "bg-emerald-500 text-white hover:bg-emerald-600"
                    }`}
                  >
                    <Upload />
                    {loading ? "Uploading..." : "Upload"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  className="p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  className="p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <textarea
                className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Thumbnail (drag & drop or click)
                  </label>
                  <div
                    ref={dropRef}
                    className={`rounded border-2 p-3 bg-gray-800 border-dashed ${
                      isDragging ? "border-yellow-400" : "border-gray-700"
                    }`}
                    style={{ minHeight: 120 }}
                  >
                    <div className="flex gap-3 items-center">
                      <div className="w-28 h-20 rounded overflow-hidden bg-gray-900 flex items-center justify-center">
                        {thumbnailPreviewUrl ? (
                          <img
                            src={thumbnailPreviewUrl}
                            alt="thumb preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-sm text-gray-400 px-2 text-center">
                            No thumbnail
                          </div>
                        )}
                      </div>

                      <div className="flex-1 text-sm text-gray-300">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={openThumbPicker}
                            className="px-3 py-2 rounded bg-white text-black text-sm"
                          >
                            Select image
                          </button>
                          <input
                            ref={thumbInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0] || null;
                              handleThumbnailFile(f);
                              e.currentTarget.value = "";
                            }}
                          />
                          {thumbnailPreviewUrl && (
                            <button
                              type="button"
                              onClick={() => {
                                setThumbnailFile(null);
                                setThumbnailPreviewUrl(
                                  selectedSlot?.thumbnailUrl || null
                                );
                              }}
                              className="px-3 py-2 border rounded text-sm text-gray-300"
                            >
                              Clear
                            </button>
                          )}
                        </div>

                        <div className="mt-2 text-xs text-gray-400">
                          Recommended: 1280×720 or 16:9. JPG/PNG/WebP supported.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Video
                  </label>
                  <div className="rounded border p-3 bg-gray-800 border-gray-700">
                    <div className="flex gap-3 items-start">
                      <div className="w-28 h-20 rounded overflow-hidden bg-black flex items-center justify-center">
                        {videoPreviewUrl ? (
                          <video
                            ref={videoRef}
                            src={videoPreviewUrl}
                            className="w-full h-full object-cover"
                            controls
                          />
                        ) : selectedSlot?.videoUrl ? (
                          <video
                            ref={videoRef}
                            src={selectedSlot.videoUrl || undefined}
                            className="w-full h-full object-cover"
                            controls
                          />
                        ) : (
                          <div className="text-sm text-gray-400 px-2 text-center">
                            No video
                          </div>
                        )}
                      </div>

                      <div className="flex-1 text-sm text-gray-300">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={openVideoPicker}
                            className="px-3 py-2 rounded bg-white text-black text-sm"
                          >
                            Select video
                          </button>
                          <input
                            ref={videoInputRef}
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0] || null;
                              handleVideoFile(f);
                              e.currentTarget.value = "";
                            }}
                          />

                          <button
                            type="button"
                            onClick={captureFrameAsThumbnail}
                            disabled={
                              !videoPreviewUrl && !selectedSlot?.videoUrl
                            }
                            className={`px-3 py-2 rounded text-sm ${
                              videoPreviewUrl || selectedSlot?.videoUrl
                                ? "bg-yellow-400 text-black"
                                : "bg-gray-700 text-gray-400 cursor-not-allowed"
                            }`}
                            title="Capture a frame from the loaded video"
                          >
                            Capture frame as thumbnail
                          </button>

                          {videoPreviewUrl && (
                            <button
                              type="button"
                              onClick={() => {
                                setVideoFile(null);
                                setVideoPreviewUrl(
                                  selectedSlot?.videoUrl || null
                                );
                              }}
                              className="px-3 py-2 border rounded text-sm text-gray-300"
                            >
                              Clear
                            </button>
                          )}
                        </div>

                        <div className="mt-2 text-xs text-gray-400">
                          Tip: upload MP4/WebM. You can capture a thumbnail from
                          the video.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {loading && (
                <div className="mt-2">
                  <div className="w-full bg-gray-800 rounded h-3 overflow-hidden">
                    <div
                      className="h-3 bg-emerald-500 transition-all duration-200"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="mt-2 flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <div>Uploading — {progress}%</div>
                  </div>
                </div>
              )}
            </form>
          </div>

          <aside className="bg-black rounded-lg p-6 shadow flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="w-28 h-40 rounded-lg overflow-hidden border border-gray-700 bg-gray-800 flex items-center justify-center">
                {thumbnailPreviewUrl ? (
                  <img
                    src={thumbnailPreviewUrl}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-sm text-gray-400 px-2 text-center">
                    No thumbnail
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold">
                    {title || selectedSlot?.title || `Slot ${slotId}`}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const el = document.querySelector<HTMLInputElement>(
                          "input[placeholder='Title']"
                        );
                        el?.focus();
                      }}
                      className="text-sm text-gray-300 hover:text-white flex items-center gap-2"
                      title="Edit metadata"
                    >
                      <Edit3 size={14} /> Edit
                    </button>
                  </div>
                </div>

                <p className="mt-2 text-gray-300 text-sm line-clamp-4">
                  {description || selectedSlot?.description || "No description"}
                </p>

                <div className="mt-4 text-xs text-gray-400">
                  Category: {category || selectedSlot?.category || "—"}
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded text-sm ${
                      selectedSlot?.videoUrl
                        ? "bg-emerald-800 text-emerald-200"
                        : "bg-gray-800 text-gray-300"
                    }`}
                  >
                    {selectedSlot?.videoUrl ? "Uploaded" : "No video"}
                  </div>

                  <button
                    type="button"
                    onClick={() => openVideoPicker()}
                    className="text-sm px-2 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    Change Video
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <div className="text-xs text-gray-400">Slot info</div>
              <div className="mt-2 text-sm text-gray-200">
                ID: {slotId} • Type:{" "}
                {selectedSlot?.type ?? (slotId <= 4 ? "portrait" : "landscape")}
              </div>
            </div>
          </aside>
        </section>
      </div>

      <div className="fixed right-4 bottom-4 flex flex-col-reverse gap-3 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`min-w-[240px] max-w-sm rounded-lg px-4 py-3 shadow-lg transform transition-all ${
              t.type === "success"
                ? "bg-emerald-600 text-white"
                : t.type === "error"
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              {t.type === "success" ? (
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  ✓
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                  !
                </div>
              )}
              <div className="text-sm">{t.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
