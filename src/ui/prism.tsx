import React from 'react'
import { css, Global } from '@emotion/react'
import { useColorMode } from '@chakra-ui/react'
import { theme } from 'src/ui/theme'

const prismBaseTheme = css`
  code {
    white-space: pre;
  }

  code[class*='language-'],
  pre[class*='language-'] {
    font-family: ${theme.fonts.mono};
    text-align: left;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    -moz-tab-size: 2;
    -o-tab-size: 2;
    tab-size: 2;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
    width: 100%;
  }

  /* Code blocks */
  pre {
    padding-top: ${theme.space[4]};
    padding-bottom: ${theme.space[4]};
    padding-left: ${theme.space[4]};
    padding-right: ${theme.space[4]};
    margin: ${theme.space[6]} 0;
    white-space: nowrap;
    overflow: auto;
    min-width: 100%;
    font-size: 0.9rem;
    border-radius: ${theme.radii.md};
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }
  .token.entity {
    cursor: help;
  }

  .mdx-marker {
    display: block;
    margin-left: -${theme.space[4]};
    margin-right: -${theme.space[4]};
    padding-left: ${theme.space[4]};
    padding-right: ${theme.space[4]};
  }

  .remark-code-title {
    padding: ${theme.space[2]} ${theme.space[4]};
    font-family: ${theme.fonts.mono};
    border-top-left-radius: ${theme.radii.md};
    border-top-right-radius: ${theme.radii.md};
    border-width: 1px;
    border-bottom-width: 0;
    font-size: ${theme.fontSizes.xs};
    margin-bottom: 0;
    width: 100%;

    + pre {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      margin-top: 0;
    }
  }
`

export const prismLightTheme = css`
  ${prismBaseTheme}

  :root {
    --prism-text-color: ${theme.colors.gray[700]};
  }

  pre {
    background-color: ${theme.colors.gray[50]};
    border: 1px solid ${theme.colors.gray[200]};
    color: var(--prism-text-color);
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${theme.colors.gray[600]};
    font-style: italic;
  }

  .token.namespace {
    opacity: 0.7;
  }

  .token.string,
  .token.attr-value {
    color: ${theme.colors.indigo[700]};
  }

  .token.punctuation,
  .token.operator {
    color: var(--prism-text-color);
  }

  .token.entity,
  .token.url,
  .token.symbol,
  .token.number,
  .token.boolean,
  .token.variable,
  .token.constant,
  .token.property,
  .token.regex,
  .token.inserted {
    color: ${theme.colors.cyan[600]};
  }

  .token.atrule,
  .token.keyword,
  .token.attr-name,
  .language-autohotkey .token.selector {
    color: ${theme.colors.red[600]};
  }

  .token.function,
  .token.deleted,
  .language-autohotkey .token.tag {
    color: ${theme.colors.purple[700]};
  }

  .token.tag,
  .token.selector,
  .language-autohotkey .token.keyword {
    color: ${theme.colors.blue[600]};
  }

  .mdx-marker {
    background-color: ${theme.colors.gray[100]};
    box-shadow: inset 3px 0px 0 0px var(--colors-accent-400);
  }

  .remark-code-title {
    background: ${theme.colors.gray[100]};
    border-color: ${theme.colors.gray[200]};
    color: ${theme.colors.gray[700]};
  }
`

export const prismDarkTheme = css`
  ${prismBaseTheme};

  :root {
    --prism-text-color: ${theme.colors.gray[400]};
  }

  pre {
    background-color: #0f141ca1;
    border: 1px solid ${theme.colors.gray[800]};
    color: var(--prism-text-color);
    box-shadow: inset 0 3px 4px 0 rgba(0, 0, 0, 0.2);
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${theme.colors.gray[600]};
    font-style: italic;
  }

  .token.string,
  .token.attr-value {
    color: ${theme.colors.yellow[500]};
  }

  .token.punctuation,
  .token.operator {
    color: var(--prism-text-color);
  }

  .token.entity,
  .token.url,
  .token.symbol,
  .token.number,
  .token.boolean,
  .token.variable,
  .token.constant,
  .token.property,
  .token.regex,
  .token.inserted {
    color: ${theme.colors.cyan[500]};
  }

  .token.atrule,
  .token.keyword,
  .token.operator,
  .token.attr-name,
  .language-autohotkey .token.selector {
    color: ${theme.colors.red[500]};
  }

  .token.function,
  .token.deleted,
  .language-autohotkey .token.tag {
    color: ${theme.colors.green[400]};
  }

  .token.tag,
  .token.selector,
  .language-autohotkey .token.keyword {
    color: ${theme.colors.blue[400]};
  }

  .token.builtin,
  .token.arrow.operator {
    color: ${theme.colors.teal[400]};
  }

  .mdx-marker {
    background-color: ${theme.colors.gray[900]};
    box-shadow: inset 3px 0px 0 0px var(--colors-accent-300);
  }

  .remark-code-title {
    background: ${theme.colors.gray[900]};
    border-color: ${theme.colors.gray[800]};
    color: ${theme.colors.gray[500]};
    box-shadow: inset 0 3px 4px 0 rgba(0, 0, 0, 0.1);
  }
`

export const PrismGlobal = () => {
  const { colorMode } = useColorMode()
  return (
    <Global styles={colorMode === 'light' ? prismLightTheme : prismDarkTheme} />
  )
}
