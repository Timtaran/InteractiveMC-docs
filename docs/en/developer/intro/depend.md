# Add a dependency

> [!NOTE]
> The InteractiveMC repository includes its own Velthoric builds, so no additional dependency is required.
>
> If you prefer to use the official Velthoric artifacts, exclude the `net.xmx` group from the InteractiveMC repository and add Velthoric separately by following the official instructions:
>
> https://github.com/velthoric/Velthoric#using-as-a-dependency

## Add a repository {#repo}

InteractiveMC artifacts are available in the ClownsProd Maven repository.

Add the following repositories to the `repositories` section of your `build.gradle`:

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

## Mod dependencies {#mod}

Add `modImplementation` to the `dependencies` section of your `build.gradle`:

::: code-group

```kotlin [Kotlin DSL]
dependencies {
    modImplementation("dev.isxander:yet-another-config-lib:${rootProject.yacl_version}+${rootProject.minecraft_version}-${loader}")
    modImplementation("net.timtaran.interactivemc:interactivemc-${loader}:${rootProject.interactivemc_version}")
    modImplementation("net.xmx.velthoric:velthoric-${rootProject.minecraft_version}-${loader}:${rootProject.velthoric_version}")

    // Vivecraft
    modImplementation("maven.modrinth:vivecraft:${rootProject.vivecraft_version}-${loader}-${loader}")

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
    modImplementation "net.timtaran.interactivemc:interactivemc-$loader:$rootProject.interactivemc_version"
    modImplementation "net.xmx.velthoric:velthoric-$rootProject.minecraft_version-$loader:$rootProject.velthoric_version"

    // Vivecraft
    modImplementation "maven.modrinth:vivecraft:$rootProject.minecraft_version-$rootProject.vivecraft_version-$loader"

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

Also set the game, interactivemc, velthoric, and vivecraft versions in `gradle.properties`, along with the LWJGL version according to the [Vivecraft documentation](https://github.com/Vivecraft/VivecraftMod/wiki/Mod-API).
