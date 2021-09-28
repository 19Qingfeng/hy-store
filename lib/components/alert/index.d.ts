import React from "react";
declare type AlertType = "primary" | "success" | "info" | "warning" | "danger";
export interface AlertProps {
    message: React.ReactNode;
    className?: string;
    showClose?: boolean;
    showIcon?: boolean;
    type?: AlertType;
    children?: React.ReactNode;
}
declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;
export { Alert };
