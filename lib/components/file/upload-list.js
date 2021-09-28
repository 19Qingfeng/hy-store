import React from 'react';
import { Icon } from '../icon';
import { Progress } from '../progress';
var prefix = 'hy';
var UploadList = function (props) {
    var fileList = props.fileList, strokeWidth = props.strokeWidth, onRemove = props.onRemove;
    var getFileStatusIcon = function (file) {
        var _a = file.status, status = _a === void 0 ? 'success' : _a;
        var maps = [
            { icon: 'spinner', theme: 'primary', status: 'ready' },
            { icon: 'spinner', theme: 'primary', status: 'uploading' },
            { icon: 'check-circle', theme: 'success', status: 'success' },
            { icon: 'times-circle', theme: 'danger', status: 'error' },
        ];
        var result = maps.find(function (i) { return i.status === status; });
        return {
            icon: result.icon,
            theme: result.theme,
        };
    };
    return (React.createElement("ul", { className: prefix + "-upload__list" }, fileList.map(function (file) {
        var _a = file.status, status = _a === void 0 ? 'success' : _a, _b = file.percentage, percentage = _b === void 0 ? 0 : _b, uid = file.uid, name = file.name;
        var _c = getFileStatusIcon(file), icon = _c.icon, theme = _c.theme;
        return (React.createElement("li", { className: prefix + "-upload__li", key: uid },
            React.createElement("div", { className: prefix + "-upload__lin" },
                React.createElement("span", { className: prefix + "-file--" + status + " " + prefix + "-file__name " },
                    React.createElement(Icon, { className: prefix + "-file__icon", theme: "secondary", icon: "file-alt" }),
                    name),
                React.createElement("span", { className: prefix + "-file__status" },
                    React.createElement(Icon, { className: prefix + "-file__ri", spin: status === 'uploading', theme: theme, icon: icon }),
                    React.createElement(Icon, { className: prefix + "-file__ri--hover", icon: "times", onClick: function () { return onRemove && onRemove(file); } }))),
            status === 'uploading' && (React.createElement(Progress, { className: prefix + "-upload__progress", percentage: percentage, showText: false, strokeWidth: strokeWidth }))));
    })));
};
export { UploadList };
