import { useState, useCallback } from 'react';
import { Upload, X, FileImage, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface UploadedFile {
  name: string;
  size: number;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
}

export function FileUploadZone() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  }, []);

  const processFiles = (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map(file => ({
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'uploading' as const,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((file, index) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress >= 100) {
          clearInterval(interval);
          setFiles(prev =>
            prev.map(f =>
              f.name === file.name ? { ...f, progress: 100, status: 'complete' } : f
            )
          );
        } else {
          setFiles(prev =>
            prev.map(f =>
              f.name === file.name ? { ...f, progress } : f
            )
          );
        }
      }, 200);
    });
  };

  const removeFile = (fileName: string) => {
    setFiles(prev => prev.filter(f => f.name !== fileName));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-slate-700 bg-slate-900/50 hover:border-slate-600'
        }`}
      >
        <Upload className="h-10 w-10 mx-auto mb-4 text-slate-400" />
        <p className="text-white mb-2">Drag & drop files here</p>
        <p className="text-slate-400 text-sm mb-4">
          or click to browse (JPEG, PNG, TIFF)
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => document.getElementById('file-upload')?.click()}
          className="border-slate-700 text-white hover:bg-slate-700"
        >
          Select Files
        </Button>
      </div>

      {/* Uploaded files list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="bg-slate-900 border border-slate-700 rounded-lg p-4"
            >
              <div className="flex items-start gap-3">
                <FileImage className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate">{file.name}</p>
                      <p className="text-slate-400 text-xs">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {file.status === 'complete' && (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.name)}
                        className="h-6 w-6 p-0 text-slate-400 hover:text-red-400"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {file.status === 'uploading' && (
                    <Progress value={file.progress} className="h-1" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
