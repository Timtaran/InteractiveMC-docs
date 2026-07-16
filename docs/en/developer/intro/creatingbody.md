# Creating a physical body

> [!NOTE]
> You can use the [Velthoric documentation](https://velthoric.github.io/velthoric-docs/) for more detail on some parts of the mod.
>
> The documentation is currently outdated, so it is recommended to follow the examples from the [built-in bodies and their code in Velthoric](https://github.com/velthoric/Velthoric/tree/master/common/src/main/java/net/xmx/velthoric/builtin).

## Body

By default, InteractiveMC allows you to grab any physical bodies except terrain.

If you want to receive events about trigger state changes, grab/release actions, or edit the grab point, implement the `IGrabbable` interface. Example:

```java
public class MyTestBody extends VxBody implements IGrabbable {
    public MyTestBody(VxBodyType type, VxPhysicsWorld physicsWorld, UUID id) {
        super(type, physicsWorld, id);
    }

    @Environment(EnvType.CLIENT)
    public MyTestBody(VxBodyType type, UUID id) {
        super(type, id);
    }

    // Required methods of the IGrabbable interface

    public @Nullable GrabPoint getGrabPoint(Player player, PlayerBodyPart bodyPart, RVec3Arg intersectionPoint, QuatArg rotationDifference) {
        // Example: Return the grab point without changing rotation or position.
        return new GrabPoint(intersectionPoint, rotationDifference);
    }

    public @Nullable GrabPoint getRemoteGrabPoint(Player player, PlayerBodyPart bodyPart, RVec3Arg intersectionPoint) {
        return new GrabPoint(intersectionPoint, QuatArg.IDENTITY);
    }
}
```

You can read more about the `IGrabbable`, `GrabPoint`, and other InteractiveMC classes in the [InteractiveMC Javadoc](https://timtaran.github.io/InteractiveMC/net/timtaran/interactivemc/body/type/package-summary.html)

## Registration

Register the physical bodies in Velthoric and adjust the behavior flags according to what you need: (you will also need a renderer, which you can learn how to create in the examples or Velthoric documentation)

```java
public class BodyRegistry {
    public static final VxBodyType<MyTestBody> TEST_BODY = VxBodyType.Builder
            .<PlayerBodyPartRigidBody>create(PlayerBodyPartRigidBody::new)
            .rigidProvider(PlayerBodyPartRigidBody::createJoltBody)
            .behaviors(builder -> builder
                    .add(new VxPersistenceBehavior())      // Whether the object should persist after unloading
                    .add(new VxNetSyncBehavior())          // Whether to sync the object with the client
                    .add(new VxSummonableBehavior())       // Whether the object can be summoned with the `/vxsummon` command
                    .add(new VxTickBehavior())             // Whether onPrePhysicsTick/onPhysicsTick functions are called during physics ticks
                    .add(new VxKillBehavior())             // Whether the object can be killed with the `/vxkill` command
                    .add(new VxSynchronizedDataBehavior()) // Whether data should be synchronized with the client
                    .add(new VxBuoyancyBehavior())         // Whether it floats in fluids

            )
            .build(ResourceLocation.fromNamespaceAndPath("yourmodid", "my_test_body"));

    /**
     * Registers all body types on the server side.
     */
    public static void register() {
        VxBodyRegistry.getInstance().register(TEST_BODY);
    }

    /**
     * Registers client-side factories and renderers for body types.
     */
    @Environment(EnvType.CLIENT)
    public static void registerClient() {
        var registry = VxBodyRegistry.getInstance();

        // Client-side factory registration
        registry.registerClientFactory(TEST_BODY.getTypeId(), MyTestBody::new);

        // Client-side renderer registration
        registry.registerClientRenderer(TEST_BODY.getTypeId(), new MyTestBodyRenderer());
    }
}
```

Use the `/vxsummon` command to summon the body.
