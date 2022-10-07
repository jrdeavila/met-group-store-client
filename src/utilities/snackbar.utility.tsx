import { ErrorResponse } from "@/models";
import { useSnackbar, VariantType, WithSnackbarProps } from "notistack";
import React from "react";
import { getValidatorErrorMessage } from "./validator.utility";

let useSnackbarRef: WithSnackbarProps;
export const SnackbarUtilsConfigurator: React.FC = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

export const SnackbarUtilities = {
  success(msg: string) {
    this.toast(msg, "success");
  },
  warning(msg: string) {
    this.toast(msg, "warning");
  },
  info(msg: string) {
    this.toast(msg, "info");
  },
  error(msg: string) {
    this.toast(msg, "error");
  },
  toast(msg: string, variant: VariantType = "default") {
    useSnackbarRef.enqueueSnackbar(msg, { variant });
  },
};

export const GreatSnackbarUtilities = {
  snackbar(error: ErrorResponse) {
    switch (error.status) {
      case 400: {
        this.error(error);
        break;
      }
      case 401: {
        this.error(error);
        break;
      }
      case 404: {
        this.error(error);
        break;
      }
      case 422: {
        this.warning(error);
        break;
      }
      default: {
        SnackbarUtilities.error(getValidatorErrorMessage(error.status));
        break;
      }
    }
  },

  warning(error: ErrorResponse) {
    this.toast(error, "warning");
  },
  info(error: ErrorResponse) {
    this.toast(error, "info");
  },
  error(error: ErrorResponse) {
    this.toast(error, "error");
  },
  toast(error: ErrorResponse, variant: VariantType = "default") {
    useSnackbarRef.enqueueSnackbar(
      <div>
        <div className="fw-bolder">{error.error}</div>
        <div>{error.help}</div>
      </div>,
      { variant }
    );
  },
};
