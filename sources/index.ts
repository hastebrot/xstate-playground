import { createMachine, createActor, assign } from "xstate";

const toggleMachine = createMachine({
  id: "toggle",
  initial: "inactive",
  context: {
    count: 0,
  },
  states: {
    inactive: {
      on: {
        TOGGLE: { target: "active" },
      },
    },
    active: {
      entry: assign({ count: ({ context }) => context.count + 1 }),
      on: {
        TOGGLE: { target: "inactive" },
      },
    },
  },
});

if (import.meta.main) {
  const toggleActor = createActor(toggleMachine);
  toggleActor.subscribe((state) => console.log(state.value, state.context));
  toggleActor.start();
  // => logs 'inactive', { count: 0 }

  toggleActor.send({ type: "TOGGLE" });
  // => logs 'active', { count: 1 }

  toggleActor.send({ type: "TOGGLE" });
  // => logs 'inactive', { count: 1 }
}
