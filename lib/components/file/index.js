var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useRef, useState } from 'react';
import { UploadList } from './upload-list';
import { DragArea } from './drag-area';
import classNames from 'classnames';
import { http } from './ajax';
var namespace = 'hy';
/**
 * 文件上传组件
 */
var Upload = function (props) {
    var children = props.children, _a = props.drag, drag = _a === void 0 ? false : _a, _b = props.showFileList, showFileList = _b === void 0 ? true : _b, accept = props.accept, multiple = props.multiple, _c = props.defaultFileList, defaultFileList = _c === void 0 ? [] : _c, onRemove = props.onRemove, className = props.className, action = props.action, _d = props.strokeWidth, strokeWidth = _d === void 0 ? 6 : _d, name = props.name, headers = props.headers, data = props.data, withCredentials = props.withCredentials, beforeUpload = props.beforeUpload, onChange = props.onChange, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError;
    var fileRef = useRef(null);
    var _e = useState(defaultFileList), fileList = _e[0], setFileList = _e[1];
    var classes = classNames(namespace + "-upload", className);
    var updateFileList = function (updateFile, updateObject) {
        setFileList(function (preList) {
            return preList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObject);
                }
                return file;
            });
        });
    };
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (files) {
            uploadFiles(files);
            fileRef.current.value = '';
        }
    };
    var uploadFiles = function (files) {
        var fileArr = Array.from(files);
        fileArr.forEach(function (file) {
            if (!beforeUpload) {
                uploadFile(file);
            }
            else {
                var result = beforeUpload(file);
                if (result instanceof Promise) {
                    result
                        .then(function (nFile) {
                        var newFile = nFile ? nFile : file;
                        uploadFile(newFile);
                    })
                        .catch(function () {
                        onChange && onChange('rejected', file);
                    });
                }
                else {
                    result ? uploadFile(file) : onChange && onChange('rejected', file);
                }
            }
        });
    };
    var generateFormData = function (file) {
        var formData = new FormData();
        var fileName = name || file.name;
        formData.append(fileName, file.raw);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        return formData;
    };
    var fetchFile = function (file, data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, http.post(action, data, {
                        headers: __assign(__assign({}, headers), { 'Content-Type': 'multipart/form-data' }),
                        withCredentials: withCredentials,
                        onUploadProgress: function (e) {
                            var percentage = Math.round((e.loaded / e.total) * 100);
                            // 谨记每次渲染state和prop都是相互独立的
                            // 每次state/props改变都会重新执行渲染函数 而每一次渲染函数的作用域中state/props都是独立的 固定的常量！！！
                            // FC中每次渲染(函数运行时)的state都是互相独立的
                            // state中的值改变的时候 这个FC函数组件会重新运行(带着新的state)
                            // 而旧的因为这里的闭包原因 拿到的是自己内部独立的fileList 所以是[]
                            // setFileList([...])
                            updateFileList(file, {
                                percentage: percentage,
                                status: 'uploading',
                            });
                            onProgress && onProgress(percentage, file);
                        },
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var uploadFile = function (file) { return __awaiter(void 0, void 0, void 0, function () {
        var _file, formData, responseData, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _file = {
                        uid: Date.now() + 'hy-file',
                        status: 'ready',
                        size: file.size,
                        name: name || file.name,
                        raw: file,
                        percentage: 0,
                    };
                    // 这里有问题
                    // setFileList([...fileList, _file]);
                    setFileList(function (preLists) { return __spreadArray(__spreadArray([], preLists, true), [_file], false); });
                    onChange && onChange('uploading', file);
                    formData = generateFormData(_file);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetchFile(_file, formData)];
                case 2:
                    responseData = _a.sent();
                    updateFileList(_file, {
                        status: 'success',
                        responseData: responseData.data,
                    });
                    onSuccess && onSuccess(responseData.data, file);
                    onChange && onChange('success', file);
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    updateFileList(_file, {
                        status: 'error',
                        error: e_1,
                    });
                    onError && onError(e_1, file);
                    onChange && onChange('error', file);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleRemove = function (file) {
        setFileList(function (preLists) {
            return preLists.filter(function (i) { return i.uid !== file.uid; });
        });
        onRemove && onRemove(file);
    };
    var handleUpload = function () {
        var inputElement = fileRef.current;
        inputElement === null || inputElement === void 0 ? void 0 : inputElement.click();
    };
    return (React.createElement("div", { className: classes },
        React.createElement("div", { onClick: handleUpload },
            drag ? (React.createElement(DragArea, { onFile: function (fileList) { return uploadFiles(fileList); } }, children)) : (children),
            React.createElement("input", { ref: fileRef, type: "file", multiple: multiple, accept: accept, className: namespace + "-upload__input", style: { display: 'none' }, onChange: handleFileChange })),
        fileList.length !== 0 && showFileList && (React.createElement(UploadList, { fileList: fileList, strokeWidth: strokeWidth, onRemove: handleRemove }))));
};
export { Upload };
