import {defineConfig, type DefaultTheme} from 'vitepress'
import {version} from "./global";

export const ru = defineConfig({
        lang: 'ru-RU',
        description: 'Привносим физические взаимодействия в Vivecraft',

        themeConfig: {
            nav: nav(),

            sidebar: {
                '/ru/guide/': {base: '/ru/guide/', items: sidebarGuide()},
            },

            editLink: {
                pattern: 'https://github.com/Timtaran/interactivemc-docs/edit/master/docs/:path',
                text: 'Редактировать страницу'
            },

            footer: {
                message: 'NOT AN OFFICIAL MINECRAFT WEBSITE. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT',
                copyright: '© 2026 - Timtaran. Опубликовано под лицензией <a href = "https://github.com/Timtaran/interactivemc-docs/LICENSE">Creative Commons</a>'
            },

            outline: {label: 'Содержание страницы'},

            docFooter: {
                prev: 'Предыдущая страница',
                next: 'Следующая страница'
            },

            lastUpdated: {
                text: 'Обновлено'
            },

            darkModeSwitchLabel: 'Оформление',
            lightModeSwitchTitle: 'Переключить на светлую тему',
            darkModeSwitchTitle: 'Переключить на тёмную тему',
            sidebarMenuLabel: 'Меню',
            returnToTopLabel: 'Вернуться к началу',
            langMenuLabel: 'Изменить язык',
        }
    })

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: version,
            items: [
                {
                    text: 'Изменения',
                    link: 'https://github.com/Timtaran/InteractiveMC/blob/master/CHANGELOG.md'
                },
                {
                    text: 'Вклад',
                    link: 'https://github.com/Timtaran/InteractiveMC/blob/master/.github/contributing.md'
                }
            ]
        }
    ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Введение',
            collapsed: false,
            items: [
                {text: 'Что такое VTubeStudio?', link: 'about-vts'},
                {text: 'Первые шаги', link: 'getting-started'},
            ]
        },
        // {text: 'Справка по API', base: '/ru/reference/', link: 'site-config'}
    ]
}

export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
    ru: {
        placeholder: 'Поиск в документации',
        translations: {
            button: {
                buttonText: 'Поиск',
                buttonAriaLabel: 'Поиск'
            },
            modal: {
                startScreen: {
                    recentSearchesTitle: 'История поиска',
                    noRecentSearchesText: 'Нет истории поиска',
                    saveRecentSearchButtonTitle: 'Сохранить в истории поиска',
                    removeRecentSearchButtonTitle: 'Удалить из истории поиска',
                    favoriteSearchesTitle: 'Избранное',
                    removeFavoriteSearchButtonTitle: 'Удалить из избранного'
                },
                errorScreen: {
                    titleText: 'Невозможно получить результаты',
                    helpText: 'Вам может потребоваться проверить подключение к Интернету'
                },
                footer: {
                    selectText: 'выбрать',
                    navigateText: 'перейти',
                    closeText: 'закрыть',
                },
                noResultsScreen: {
                    noResultsText: 'Нет результатов для',
                    suggestedQueryText: 'Вы можете попытаться узнать',
                    reportMissingResultsText:
                        'Считаете, что поиск даёт ложные результаты？',
                    reportMissingResultsLinkText: 'Нажмите на кнопку «Обратная связь»'
                }
            }
        }
    }
}