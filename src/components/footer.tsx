import React, { FunctionComponent } from "react"
import { useTranslation } from "react-i18next";
import i18n from '../i18n';
import {
  FooterContainer,
  Footer
} from '../components/styles'

const FooterComponent: FunctionComponent = () => {
  const { t } = useTranslation('translations', { i18n });
  return (
    <FooterContainer>
      <Footer>
        <span>{t('footer.privacy')}</span>
        <span>{t('footer.sponsors')}</span>
        <span>{t('footer.about')}</span>
      </Footer>
    </FooterContainer>
  )
}

export default FooterComponent
