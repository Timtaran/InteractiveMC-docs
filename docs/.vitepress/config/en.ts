import { defineConfig, type DefaultTheme } from 'vitepress'
import {version} from "./global";

export const en = defineConfig({
    lang: 'en-US',
    description: 'Bringing physical interactions in Vivecraft',

    themeConfig: {
        nav: nav(),

        sidebar: {
            '/guide/': { base: '/guide/', items: sidebarGuide() },
        },

        editLink: {
            pattern: 'https://github.com/Timtaran/interactivemc-docs/edit/master/docs/:path',
            text: 'Edit this page on GitHub'
        },

        footer: {
            message: 'NOT AN OFFICIAL MINECRAFT WEBSITE. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT',
            copyright: '© 2026 - Timtaran. Published under <a href = "https://github.com/Timtaran/interactivemc-docs/LICENSE">Creative Commons</a> license'
        }
    }
})

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: version,
            items: [
                {
                    text: 'Changelog',
                    link: 'https://github.com/Timtaran/InteractiveMC/blob/master/CHANGELOG.md'
                },
                {
                    text: 'Contributing',
                    link: 'https://github.com/Timtaran/InteractiveMC/blob/master/.github/contributing.md'
                }
            ]
        }
    ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Introduction',
            collapsed: false,
            items: [
            ]
        },
        // { text: 'API Reference', base: '/reference/', link: 'site-config' }
    ]
}