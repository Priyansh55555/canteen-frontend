import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Upload, X } from 'lucide-react';

const ImageUploadDropdown = ({
  isEditing,
  hasImage,
  onUpload,
  onRemove,
  triggerContent,
  className = '',
  position = 'bl', // default: bottom-left
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const fileInputRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute position
  const updatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const gap = 8;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'tl': // top-left
        top = rect.top - gap;
        left = rect.left;
        break;

      case 'tr': // top-right
        top = rect.top - gap;
        left = rect.right;
        break;

      case 'br': // bottom-right
        top = rect.bottom + gap;
        left = rect.right;
        break;

      case 'bl': // bottom-left (default)
      default:
        top = rect.bottom + gap;
        left = rect.left;
        break;
    }

    setCoords({ top, left });
  };

  const toggleDropdown = () => {
    if (!isOpen) updatePosition();
    setIsOpen((prev) => !prev);
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
    onUpload();
    setIsOpen(false);
  };

  const handleRemove = () => {
    onRemove?.();
    setIsOpen(false);
  };

  if (!isEditing) return null;

  return (
    <>
      {/* Trigger */}
      <div ref={triggerRef} >
        <button type="button" className={className} onClick={toggleDropdown}>
          {triggerContent}
        </button>
      </div>

      {/* Portal Dropdown */}
      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: 'fixed',
              top: coords.top,
              left: coords.left,
              transform:
                position.includes('r') ? 'translateX(-100%)' : 'translateX(0)',
              zIndex: 9999,
            }}
            className="bg-white rounded-xl shadow-2xl border border-gray-100 py-2 min-w-[160px]"
          >
            {/* Upload */}
            <button
              type="button"
              onClick={handleUpload}
              className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-orange-50 text-sm text-gray-700"
            >
              <Upload size={16} className="text-orange-500" />
              <span className="font-medium">
                {hasImage ? 'Change Image' : 'Upload Image'}
              </span>
            </button>

            {/* Remove */}
            {hasImage && (
              <button
                type="button"
                onClick={handleRemove}
                className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-red-50 text-sm text-red-600"
              >
                <X size={16} className="text-red-500" />
                <span className="font-medium">Remove Image</span>
              </button>
            )}
          </div>,
          document.body
        )}
    </>
  );
};

export default ImageUploadDropdown;