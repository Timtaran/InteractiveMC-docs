import { defineConfig, type DefaultTheme } from 'vitepress'
import { version } from "./global";

export const en = defineConfig({
    lang: 'en-US',
    description: 'Bringing physical interactions in Vivecraft',

    themeConfig: {
        nav: nav(),

        sidebar: {
            '/player/': sidebarPlayer(),
            '/developer/': sidebarDeveloper()
        },

        editLink: {
            pattern: 'https://github.com/Timtaran/interactivemc-docs/edit/master/docs/:path',
            text: 'Edit this page on GitHub'
        },

        footer: {
            message: 'NOT AN OFFICIAL MINECRAFT WEBSITE. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT',
            copyright: '© 2026 - Timtaran. Published under <a href = "https://github.com/Timtaran/interactivemc-docs/blob/master/LICENSE">Creative Commons</a> license'
        }
    }
})

function nav(): DefaultTheme.NavItem[] {
    return [
        { text: 'Players', link: '/player/' },
        { text: 'Developers', link: '/developer/' },
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

function sidebarPlayer(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Players',
            items: [
                { text: 'Player guides', link: '/player' },
                { text: 'Installation', link: '/player/install' },
                { text: 'Configuration', link: '/player/config' },
            ]
        }
    ]
}

function sidebarDeveloper(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Developers',
            items: [
                { text: 'Developer guides', link: '/developer' },
                {
                    text: 'Introduction', collapsed: false, items: [
                        { text: 'Template', link: '/developer/intro/template' },
                        { text: 'Add a dependency', link: '/developer/intro/depend' },
                        { text: 'Create a physical body', link: '/developer/intro/creatingbody' },
                    ]
                }
            ]
        }
    ]
}