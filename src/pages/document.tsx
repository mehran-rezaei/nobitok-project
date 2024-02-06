import Medical_document from "@/component/documnet/medical_document";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RecoilRoot } from "recoil";

function Document() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    document.body.dir = i18n.dir();
  });
  return (
    <RecoilRoot>
      <Medical_document  />
    </RecoilRoot>
  );
}

export default Document;
