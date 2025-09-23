// ==UserScript==
// @name        脚本测试
// @namespace   http://52shell.ltd/
// @match       *://*/*
// @grant       none
// @license     MIT
// @version     1.0
// @author      Shell
// @description 2024/3/20 10:29:17
// ==/UserScript==

(function () {
  "use strict";

  // 封装浮动提示框的函数
  window.showFloatingToast = function (message, duration) {
    // 创建浮动提示框元素
    var floatingToast = document.createElement("div");
    floatingToast.className = "floating-toast";
    document.body.appendChild(floatingToast);

    // 添加 CSS 样式
    var style = document.createElement("style");
    style.textContent = `
            .floating-toast {
                position: fixed;
                background-color: #f0f2f5;
                color: #333;
                padding: 10px 20px;
                border-radius: 8px;
                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                display: none;
                z-index: 9999;
            }
        `;
    document.head.appendChild(style);

    // 显示浮动提示框
    floatingToast.textContent = message;
    floatingToast.style.display = "block";

    // 计算下一个提示框的位置
    var existingToasts = document.querySelectorAll(".floating-toast");
    var topOffset = 20; // 初始位置
    for (var i = 0; i < existingToasts.length; i++) {
      topOffset += existingToasts[i].offsetHeight + 10; // 累加已存在提示框的高度和间距
    }
    floatingToast.style.top = topOffset + "px";

    // 定时隐藏提示框
    setTimeout(function () {
      floatingToast.style.display = "none";
      // 移除提示框元素和样式
      floatingToast.remove();
      style.remove();
    }, duration);
  };

  // 调用 showFloatingToast 函数显示浮动提示框
  showFloatingToast("已为你自动勾选同意协议", 5000); // 显示5秒后自动隐藏
  showFloatingToast("已为你自动填写账号密码", 5000); // 显示5秒后自动隐藏
})();
