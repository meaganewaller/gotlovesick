'use client'

import { FC, useState } from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { HiLink } from 'react-icons/hi';
import { CopyLinkButtonProps } from '@/types';

const CopyLinkButton: FC<CopyLinkButtonProps> = ({ copyShareLink }) => {
  const [shareLinkClicked, setShareLinkClicked] = useState(false)
  const [shareLinkAnimatingOut, setShareLinkAnimatingOut] = useState(false)

  const handleShareLinkClicked = async (shareLink: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareLink);
      } else {
        const el = document.createElement('textarea');
        el.value = shareLink;
           el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);

        if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
          // iOS-specific workaround for text selection
          const range = document.createRange();
          range.selectNodeContents(el);
          const selection = window.getSelection();
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
          }
          el.setSelectionRange(0, 999999);
        } else {
          el.select();
        }

        document.execCommand('copy');
        document.body.removeChild(el);
      }

      // Show "Link copied!" tooltip
      if (!shareLinkClicked) {
        setShareLinkClicked(true);
        setTimeout(() => {
          setShareLinkAnimatingOut(true);
          setTimeout(() => {
            setShareLinkClicked(false);
            setShareLinkAnimatingOut(false);
          }, 300); // Tooltip animation duration
        }, 1500); // Tooltip visibility duration
      }
    } catch (err) {
      console.error('Failed to copy the link: ', err);
    }
  };

  return (
    <li className="share-button-outer-container">
      <button
        className="share-button link-share-button"
        onClick={() => {
          if (copyShareLink) {
            handleShareLinkClicked(copyShareLink);
          }
        }}
      >
        <HiLink className="link-share-button-icon" />
        {shareLinkClicked && (
          <div
            className={`tooltip-container ${
              shareLinkAnimatingOut ? 'tooltip-animating-out' : ''
            }`}
          >
            <div className="tooltip-outer-wrapper">
              <div className="tooltip-inner-wrapper">
                <IoIosCheckmarkCircle />
                <span>Link copied!</span>
              </div>
            </div>
          </div>
        )}
      </button>
    </li>
  );
};

export default CopyLinkButton;
