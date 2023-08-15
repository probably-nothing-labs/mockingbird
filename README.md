![Mockingbird Logo](assets/logo/logo_white.png)


### To Run Denormazlied Data Generator ###

Example commands

```
node apps/cli denormalized --address=http://localhost:3001 --topic=stocks_808 --auth="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTE1MzMzMTksImV4cCI6MTY5MTU2OTMxOSwidXNlcl9pZCI6IjUyOTQzMzg5LWUyOWQtNDRhZS05ZTY5LThkOWQ4ZDZmOGJjYSIsImlzcyI6Imh0dHBzOi8vMzQ1MjI0MDcucHJvcGVsYXV0aHRlc3QuY29tIiwiZW1haWwiOiJhbWV5QHByb2JhYmx5bm90aGluZ2xhYnMueHl6IiwiZmlyc3RfbmFtZSI6IkFtZXkiLCJsYXN0X25hbWUiOiJDaGF1Z3VsZSIsIm9yZ19pZF90b19vcmdfbWVtYmVyX2luZm8iOnsiODcxMmUzZWEtZTYzYy00YjdlLWE4Y2ItZDU2ODlkYTNiOTNkIjp7Im9yZ19pZCI6Ijg3MTJlM2VhLWU2M2MtNGI3ZS1hOGNiLWQ1Njg5ZGEzYjkzZCIsIm9yZ19uYW1lIjoiUE5MIiwidXJsX3NhZmVfb3JnX25hbWUiOiJwbmwiLCJvcmdfbWV0YWRhdGEiOnt9LCJ1c2VyX3JvbGUiOiJPd25lciIsImluaGVyaXRlZF91c2VyX3JvbGVzX3BsdXNfY3VycmVudF9yb2xlIjpbIk93bmVyIiwiQWRtaW4iLCJNZW1iZXIiXSwidXNlcl9wZXJtaXNzaW9ucyI6WyJwcm9wZWxhdXRoOjpjYW5faW52aXRlIiwicHJvcGVsYXV0aDo6Y2FuX2NoYW5nZV9yb2xlcyIsInByb3BlbGF1dGg6OmNhbl9yZW1vdmVfdXNlcnMiLCJwcm9wZWxhdXRoOjpjYW5fbWFuYWdlX2FwaV9rZXlzIl19fSwicHJvcGVydGllcyI6eyJtZXRhZGF0YSI6bnVsbH19.graZIkYPmfJ27Fz6ljQCzZIXOY4aJ2NVi0V1-MuSGveFxtny0e0KVm2UoCDrNZIbmwFkIG9ux2XqqVyVb4W_SQtrDaHugE5_Gqa9mvzv-xqoBYOXLyOSzpoT7n0waKbknPhadto60IN-4QjDh_SgFwdt9tE1_PSGKmgJpjbpZlFf2eovaqUvQo6d4X_h8JE6t4Sv5UTx7fNMpAW7rJ7GjKLHqJfmc6FegEKWbCoANUglJAry8XhuyB2bVGUjKo-WinLhTAm7Z32BBHnpvscmwpwlTfQkNqBihgQBfT_QmXZKwDKJ-zkRIxnUmFYhsH0AcwOerAa5Iu_ZCx3pi5AZFQ" --key="stock_symbol" --template "Stock Prices" --eps 10
```
# Mockingbird

Mockingbird is mock streaming data generator built by [Tinybird](https://tinybird.co).

It can be used as a library in other projects, or on its own via the UI or CLI.

Mockingbird can send data to any downstream HTTP endpoint through Destination plugins. If you don't see a Destination that you want, feel free to request it or contribute it!

If you simply want to use the Web UI, you use the hosted one here: [https://mockingbird.tinybird.co/](https://mockingbird.tinybird.co/)

## Docs

Find the docs at [https://mockingbird.tinybird.co/docs](https://mockingbird.tinybird.co/docs)

## Usage

### Web UI

The Web UI provides and easy to use, guided experience. It should be pretty easy to get started with, so give it a go!

If you need help with defining schemas, or configuring particular Destinations, you can find more complete documentation [here](https://mockingbird.tinybird.co/docs).

### Passing params in the URL

If you want to re-use configurations from a previous session, you can simply save the URL. All settings are saved as parameters in the URL, so you can re-use and share configs with your team. For example: [http://localhost:3000/?schema=z_sales&eps=1&host=eu_gcp&datasource=sales_dg&token=p.eyJ1IjogIjg4Nzk5NGUxLWZmNmMtNGUyMi1iZTg5LTNlYzBmNmRmMzlkZCIsICJpZCI6ICIwN2RlZThhMS0wNGMzLTQ4OTQtYmQxNi05ZTlkMmM3ZWRhMTgifQ.p_N4EETK7dbxOgHtugAUue3BUWwyGHT461Ha8P-d3Go](http://localhost:3000/?schema=z_sales&eps=1&host=eu_gcp&datasource=sales_dg&token=p.eyJ1IjogIjg4Nzk5NGUxLWZmNmMtNGUyMi1iZTg5LTNlYzBmNmRmMzlkZCIsICJpZCI6ICIwN2RlZThhMS0wNGMzLTQ4OTQtYmQxNi05ZTlkMmM3ZWRhMTgifQ.p_N4EETK7dbxOgHtugAUue3BUWwyGHT461Ha8P-d3Go)

**Warning**: all settings are saved in the URL including senstive field such as tokens & passwords! This is helpful in many occasions for demos, POCs and tests where these credentials are short-lived and disposable - but take care if you are using credentials that must not be shared!

### CLI

Mockingbird is available as a standalone CLI.

Install the CLI with:

```
npm install @tinybirdco/mockingbird-cli
```

Here is an example of sending data to the Tinybird Events API:

```sh
> mockingbird-cli tinybird
  --schema schema.json \
  --datasource "my_data_source" \
  --token "e.Pdjdbfsbhksd...." \
  --endpoint eu_gcp \
  --eps 50 \
  --limit 200
```

## Contributing

All contributions are welcome! We encourages individuals & commerical vendors to contribute to Mockingbird to build a data generator that works for everyone.

The repository has the following structure:

```bash
├── apps
│   ├── cli
│   ├── docs
│   └── web
└── packages
    └── mockingbird
```

### Generator

The core Mockingbird generator is under `./packages/mockingbird`. All new Data Types, Schemas and Destinations are added here.

The generator is written in TypeScript & uses [Faker.js](https://fakerjs.dev/) under the hood to power much of the fake data generation. Custom Data Types are added on-top of Faker to supplement where needed.

#### Adding new Data Types

DataTypes are defined in [/packages/mockingbird/src/extendedFaker.ts](./packages/mockingbird/src/extendedFaker.ts).

To add a new Data Type, add a new item to the `mockingbirdModule` object.

They key of the item will become the name of the Data Type. Types added to this module are automatically added to the `mockingbird` namespace, meaning that they are referenced in schemas like `mockingbird.myTypeName`, this avoids clashes with Faker.js types.

The value of the item must be a function that returns the desired value. The function can have 1 optional parameter, which allows the function to accept incoming parameters.

For example, a custom Data Type that takes no input params:

```javascript
latitudeNumeric: () => parseFloat(faker.address.latitude()),
```

A custom Data Type that accepts incoming parameters:

```javascript
pick: (params: { values: unknown[] }) =>
    params.values[Math.floor(Math.random() * params.values.length)],
```

#### Adding new preset Schemas

Preset Schemas are defined in [/packages/mockingbird/src/presetSchemas.ts](./packages/mockingbird/src/presetSchemas.ts).

To add a new Schema, add a new item to the `presetSchemas` object.

They key of the item will become the name of the Schema. Ensure that you choose a name that does not clash with an existing preset Schema.

The value of the item is an object that defined the Schema, just as you would define it via the Web UI.

```javascript
"Simple Example": {
    some_int: {
        type: "mockingbird.int",
    },
    some_values: {
        type: "mockingbird.pick",
        params: [
            {
                values: [123, 456],
            },
        ],
    },
    values_weighted: {
        type: "mockingbird.pickWeighted",
        params: [
            {
                values: [123, 456, 789],
                weights: [90, 7, 3],
            },
        ],
    },
},
```

### CLI

The CLI is under `./apps/cli`

The CLI is Node based and uses [`yargs`](https://github.com/yargs/yargs).

### Web UI

The Web UI is under `./apps/web`

The Web UI is a Next.js application written in TypeScript.

#### Running the local dev server

To run the Mockingbird UI locally, first install Node.js (developed using v18).

Then, use these commands:

```bash
git clone https://github.com/tinybirdco/mockingbird.git
cd mockingbird
npm install
npm run dev
```

This will serve both the Web UI & the documentation site locally. By default, the UI is available on `http://localhost:3001` and the docs are on `http://localhost:3000`.

### Docs

The Docs are under `./apps/docs`

The Docs are written in MDX using [Nextra](https://nextra.site/) as a static site generator.

To run the docs locally, see the instructions for the running the [Web UI](#running-the-local-dev-server).
