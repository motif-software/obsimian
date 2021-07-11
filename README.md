# Obsimian

Obsidian simulation framework for testing Obsidian plugins.

## Usage

If you simply want to test your plugin code against the standard Obsimian test vault:

1. Add Obsimian as a dev dependency
2. In your test, create an `ObsimianPlugin` initialized with the downloaded data.

If you want to customize the content of the vault:

1. Create an Obsidian vault, or download the Obsimian test vault as a starting point.
2. Open the vault in Obsidian and modify to your heart's content (hah).
3. Install and enable the Obsimian plugin in Obsidian (it should be preinstalled in the test vault).
4. Run the "Obsimian: Dump data" command. By default, this will create a JSON file in the root of your Obsidian vault, but this can be configured in the Obsimian plugin settings.
5. Copy the JSON file to your project.
6. In your test, import the JSON data with `require` and pass it to the `ObsimianPlugin` constructor.

## Design

Where possible, it is good practice to decouple the code you write from the platforms and frameworks you use.

The simplest way to write an Obsidian plugin is to follow the sample:

```ts
class MyPlugin extends Plugin {
  // Dump all your business logic here.
}
```

However this is difficult to test, since you can't actually instantiate your `MyPlugin` without an Obsidian `App`, which requires the whole Obsidian implementation. Even if this were readily available, it would be overkill for simple unit testing.

Instead, most of your plugin's business logic should be written without any knowledge of Obsidian's functionality or types. This way, each function of your business logic can be easily unit tested as it would be in any other project.

### Integration

You will ultimately need some glue code to handle communication between Obsidian and your plugin's business logic. This should be as thin as possible:

```ts
class MyPlugin extends Plugin {
  settings: MyPluginSettings;

  async onload() {
    await this.loadSettings();

    this.addCommand({
      id: "my-foo",
      name: "Do the Foo",
      callback: () => {
        businessLogic.doTheFoo(this.settings.fooPath);
      },
    });
  }
}
```

You will also want to some integration tests to verify that your plugin will work when it receives real commands in Obsidian. This is where **Obsimian** comes in.

If your business logic needs to interact with Obsidian's APIs (which it probably will), it should receive instances of its dependencies (e.g. `Plugin`, `App`, `Vault`) as _arguments_. This allows your tests to pass in "fake" instances of those dependencies that are lightweight and prepopulated with known data:

```ts
describe("my plugin", () => {
  const app = new ObsimianApp(data);
  it("does the bar correctly", () => {
    expect(businessLogic.doTheBar(app)).toEqual("Bar.");
  });
});
```

So long as the behavior of the fake components is sufficiently similar to the real ones, you can be confident your plugin will work in real life.

## Package Contents

### src/

The code.

### test/vault

The test vault is a real Obsidian vault with fake content crafted to expose edge cases in plugins.

## Testing Obsimian

```sh
jest --watch
```
