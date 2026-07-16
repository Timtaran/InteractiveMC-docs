# Создание физического тела

> [!NOTE]
> Вы можете воспользоваться [документацией Velthoric](https://velthoric.github.io/velthoric-docs/), чтобы работу некоторых частей мода подробнее.
>
> На данный момент документация является устаревшей, поэтому рекомендуется брать пример с [встроенных в Velthoric тел и их кода](https://github.com/velthoric/Velthoric/tree/master/common/src/main/java/net/xmx/velthoric/builtin).

## Тело

По умолчанию InteractiveMC позволяет хватать любые физические тела, кроме ландшафта.

Если вы хотите получать ивенты об изменении состояния триггера, хвате/отпуске, или хотите редактировать точку хвата, реализуйте интерфейс `IGrabbable`. Пример:

```java
public class MyTestBody extends VxBody implements IGrabbable {
    public MyTestBody(VxBodyType type, VxPhysicsWorld physicsWorld, UUID id) {
        super(type, physicsWorld, id);
    }

    @Environment(EnvType.CLIENT)
    public MyTestBody(VxBodyType type, UUID id) {
        super(type, id);
    }

    // Обязательные методы интерфейса IGrabbable

    public @Nullable GrabPoint getGrabPoint(Player player, PlayerBodyPart bodyPart, RVec3Arg intersectionPoint, QuatArg rotationDifference) {
        // Пример: Возвращаем точку захвата без измнений в вращении и положении.
        return new GrabPoint(intersectionPoint, rotationDifference);
    }

    public @Nullable GrabPoint getRemoteGrabPoint(Player player, PlayerBodyPart bodyPart, RVec3Arg intersectionPoint) {
        return new GrabPoint(intersectionPoint, QuatArg.IDENTITY);
    }
}
```

Вы можете почитать подробнее о типах `IGrabbable`, `GrabPoint` и других классах InteractiveMC в [Javadoc InteractiveMC](https://timtaran.github.io/InteractiveMC/net/timtaran/interactivemc/body/type/package-summary.html)

## Регистрация

Зарегистрируйте физические тела в Velthoric и измените флаги поведения в соответствии с тем, что вам нужно: (вам так же понадобится рендерер, вы можете ознакомиться с созданием такового в примерах или документацией Velthoric)

```java
public class BodyRegistry {
    public static final VxBodyType<MyTestBody> TEST_BODY = VxBodyType.Builder
            .<PlayerBodyPartRigidBody>create(PlayerBodyPartRigidBody::new)
            .rigidProvider(PlayerBodyPartRigidBody::createJoltBody)
            .behaviors(builder -> builder
                    .add(new VxPersistenceBehavior())      // Сохраненять ли объект после выгрузки
                    .add(new VxNetSyncBehavior())          // Синхронизировать ли объект с клиентом 
                    .add(new VxSummonableBehavior())       // Возможно ли призвать объект командой `/vxsummon`
                    .add(new VxTickBehavior())             // Вызываются ли функции onPrePhysicsTick/onPhysicsTick во время физических тиков
                    .add(new VxKillBehavior())             // Возможно ли убить объект командой `/vxkill`
                    .add(new VxSynchronizedDataBehavior()) // Синхронизировать ли данные с клиентом
                    .add(new VxBuoyancyBehavior())         // Плавает ли в жидкостях

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

Чтобы призвать тело воспользуйтесь командой `/vxsummon`.