// ==UserScript==
// @name        linux.do Obsidian Callouts回复
// @namespace   http://52shell.ltd/
// @match       https://linux.do/*
// @grant       none
// @license     MIT
// @version     1.0
// @author      Shell
// @description 2025/9/22 14:50:54
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', function() {
        const footerControls = document.querySelector('.timeline-footer-controls');
        if (!footerControls) {
            console.error('未找到父容器');
            return;
        }

        if (footerControls.querySelector('.obsidian-success-button')) {
            console.log('Success 按钮已存在，无需重复添加');
            return;
        }

        const newButtonContainer = document.createElement('div');
        newButtonContainer.style.marginTop = '10px';
        newButtonContainer.style.width = '100%';

        const successBtn = document.createElement('button');
        successBtn.className = 'btn no-text btn-icon emoji obsidian-success-button';

        successBtn.style.cssText = `
            background-color: #28a745;
            color: white;
            border-radius: 25px;
            padding: 0 20px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            font-weight: bold;
            font-size: 14px;
            cursor: pointer;
        `;

        successBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
        });

        successBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        });

        successBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12l5 5 10-10"/>
            </svg>
            <span>Success</span>
        `;

        newButtonContainer.appendChild(successBtn);
        footerControls.appendChild(newButtonContainer);

        successBtn.addEventListener('click', function() {
            const replyTriggerBtn = document.querySelector('button[title="开始撰写此话题的回复"]');
            if (replyTriggerBtn) {
                replyTriggerBtn.click();
            } else {
                console.error('未找到回复触发按钮');
                return;
            }

            const checkReplyBox = setInterval(() => {
                const replyBox = document.querySelector('.d-editor-input');
                if (replyBox) {
                    clearInterval(checkReplyBox);

                    const start = replyBox.selectionStart;
                    const end = replyBox.selectionEnd;
                    const contentToInsert = '>[!success]';

                    replyBox.value = replyBox.value.slice(0, start) + contentToInsert + replyBox.value.slice(end);
                    const newCursorPos = start + contentToInsert.length;
                    replyBox.setSelectionRange(newCursorPos, newCursorPos);
                    replyBox.dispatchEvent(new Event('input', { bubbles: true }));
                    replyBox.focus();
                }
            }, 100);

            setTimeout(() => {
                clearInterval(checkReplyBox);
                console.error('等待回复框超时');
            }, 3000);
        });
    });
})();
