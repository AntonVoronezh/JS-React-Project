// @ts-ignore
import React from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  syncNow: () => void;
}

const SyncBtn222 = ({ syncNow }: IProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <button className="btn btn-warning" onClick={syncNow}>
      {t("sync.now")}
    </button>
  );
};

export { SyncBtn222 };
