import classNames from 'classnames';
import React, { useState } from 'react';
var prefix = 'hy';
var DragArea = function (props) {
    var onFile = props.onFile, children = props.children;
    var _a = useState(false), status = _a[0], setStatus = _a[1];
    var classes = classNames(prefix + "-upload__drag", {
        'is-dragover': status,
    });
    // 进入区域
    var handleDragEnter = function (e) {
        setStatus(true);
        e.preventDefault();
    };
    // 区域移动
    var handleDragOver = function (e) { return e.preventDefault(); };
    // 离开区域
    var handleDragLeave = function (e) {
        setStatus(false);
        e.preventDefault();
    };
    // 放置区域
    var handleDrop = function (e) {
        setStatus(false);
        var files = e.dataTransfer.files;
        if (files && files.length > 0) {
            onFile(files);
        }
        e.preventDefault();
    };
    return (React.createElement("div", { className: classes, onDragEnter: handleDragEnter, onDragOver: handleDragOver, onDragLeave: handleDragLeave, onDrop: handleDrop }, children));
};
export { DragArea };
