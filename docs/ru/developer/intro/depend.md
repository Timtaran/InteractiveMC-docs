# Добавление зависимости

> [!TIP]
> Репозиторий InteractiveMC включает собственные сборки Velthoric, поэтому дополнительная зависимость не требуется.
>
> Если вы предпочитаете использовать официальные артефакты Velthoric, исключите группу `net.xmx` из репозитория InteractiveMC и подключите Velthoric отдельно, следуя официальной инструкции:
>
> https://github.com/velthoric/Velthoric#using-as-a-dependency

## Добавление репозитория {#repo}

Артефакты InteractiveMC находятся в Maven-репозитории ClownsProd.

Добавьте следующие репозитории в секцию `repositories` вашего `build.gradle`:

::: code-group

```kotlin [Kotlin DSL]
repositories {
    maven("https://api.modrinth.com/maven")

    maven("https://maven.clwn.org/releases") {
        name = "ClownsProd Releases"

        // Uncomment if you want to use Velthoric from the official Cloudsmith repository.
        // content {
        //     excludeGroup("net.xmx")
        // }
    }

    maven("https://maven.clwn.org/snapshots") {
        name = "ClownsProd Snapshots"

        // Uncomment if you want to use Velthoric from the official Cloudsmith repository.
        // content {
        //     excludeGroup("net.xmx")
        // }
    }
}
```

```groovy [Groovy DSL]
repositories {
    maven { url = "https://api.modrinth.com/maven" }

    maven {
        url = "https://maven.clwn.org/releases"
        name = "ClownsProd Releases"

        // Uncomment if you want to use Velthoric from the official Cloudsmith repository.
        // content {
        //     excludeGroup "net.xmx"
        // }
    }

    maven {
        url = "https://maven.clwn.org/snapshots"
        name = "ClownsProd Snapshots"

        // Uncomment if you want to use Velthoric from the official Cloudsmith repository.
        // content {
        //     excludeGroup "net.xmx"
        // }
    }
}
```

:::

## Зависимости мода {#mod}

Добавьте `modImplementation` в секцию `dependencies` вашего `build.gradle`:

::: code-group

```kotlin [Kotlin DSL]
dependencies {
    modImplementation("dev.isxander:yet-another-config-lib:${rootProject.yacl_version}+${rootProject.minecraft_version}-${loader}")
    modImplementation("net.timtaran.interactivemc:interactivemc-fabric:${rootProject.interactivemc_version}")
    modImplementation("net.xmx.velthoric:velthoric-${rootProject.minecraft_version}-fabric:${rootProject.velthoric_version}")

    // Vivecraft
    modImplementation("maven.modrinth:vivecraft:1.21.4-1.3.0-fabric")

    runtimeOnly("org.lwjgl:lwjgl-openvr:${rootProject.lwjgl_version}")
    runtimeOnly("org.lwjgl:lwjgl-openvr:${rootProject.lwjgl_version}:natives-windows")
    runtimeOnly("org.lwjgl:lwjgl-openvr:${rootProject.lwjgl_version}:natives-linux")
    runtimeOnly("org.lwjgl:lwjgl-openvr:${rootProject.lwjgl_version}:natives-macos")

    runtimeOnly("com.illposed.osc:javaosc-core:0.9")
    runtimeOnly("com.github.bhaptics:tact-java:0.1.4")
    runtimeOnly("org.java-websocket:Java-WebSocket:1.5.1")
    runtimeOnly("com.electronwill.night-config:toml:3.6.6")
    runtimeOnly("com.electronwill.night-config:core:3.6.6")
}
```

```groovy [Groovy DSL]
dependencies {
    modImplementation "dev.isxander:yet-another-config-lib:$rootProject.yacl_version+$rootProject.minecraft_version-$loader"
    modImplementation "net.timtaran.interactivemc:interactivemc-fabric:$rootProject.interactivemc_version"
    modImplementation "net.xmx.velthoric:velthoric-$rootProject.minecraft_version-fabric:$rootProject.velthoric_version"

    // Vivecraft
    modImplementation "maven.modrinth:vivecraft:1.21.4-1.3.0-fabric"

    runtimeOnly "org.lwjgl:lwjgl-openvr:$rootProject.lwjgl_version"
    runtimeOnly "org.lwjgl:lwjgl-openvr:$rootProject.lwjgl_version:natives-windows"
    runtimeOnly "org.lwjgl:lwjgl-openvr:$rootProject.lwjgl_version:natives-linux"
    runtimeOnly "org.lwjgl:lwjgl-openvr:$rootProject.lwjgl_version:natives-macos"

    runtimeOnly "com.illposed.osc:javaosc-core:0.9"
    runtimeOnly "com.github.bhaptics:tact-java:0.1.4"
    runtimeOnly "org.java-websocket:Java-WebSocket:1.5.1"
    runtimeOnly "com.electronwill.night-config:toml:3.6.6"
    runtimeOnly "com.electronwill.night-config:core:3.6.6"
}
```

:::

Так же задайте версии игры, interactivemc, velthoric, vivecraft в `gradle.properties`, а также версию LWJGL в соответствии с [документацией Vivecraft](https://github.com/Vivecraft/VivecraftMod/wiki/Mod-API).