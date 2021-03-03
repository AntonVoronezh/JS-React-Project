// @ts-ignore
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

const MainPage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <h1 className="display-4">{t("mainPage.title")}</h1>
      <div>{t("mainPage.text")}</div>
    </Fragment>
  );
};

export { MainPage };
