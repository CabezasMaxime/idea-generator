import { Roboto, Lobster } from '@next/font/google'
import { ChakraProvider, defineStyleConfig, extendTheme, theme as defaultTheme} from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import RootLayout from '../ui/components/RootLayout'

const fontText = Roboto({
  weight: "400",
  subsets: ['latin']
})

const fontTitle = Lobster({
  weight: "400",
  subsets: ['latin']
})

const fonts = {
  heading: fontTitle.style.fontFamily,
  "*": fontText.style.fontFamily
}

const colors = {
  green: {
    500: defaultTheme.colors.green["400"],
    600: defaultTheme.colors.green["500"],
    700: defaultTheme.colors.green["600"]
  }
}

const buttonTheme = defineStyleConfig({
  baseStyle: {
    boxShadow: "1px 2px 5px 1px rgba(0, 0, 0, 0.2)"
  }
})

const theme = extendTheme({ fonts, colors, components: {Button: buttonTheme} })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ChakraProvider>
    </RecoilRoot>
  )
}
