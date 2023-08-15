import { Row, baseConfigSchema } from "../types";
import { z } from "zod";
import BaseGenerator from "./BaseGenerator";



const denormalizedConfigSchema = baseConfigSchema.merge(
    z.object({
        address: z.string().url(),
        auth: z.string(),
        topic: z.string(),
        key: z.string(),
    })
);

export type DenormalizedConfig = z.infer<typeof denormalizedConfigSchema>;


export default class DenormalizedGenerator extends BaseGenerator<DenormalizedConfig> {
    readonly config: DenormalizedConfig;
    topic_initialized: boolean = false;

    async sendData(data: Row[]): Promise<void> {
        const base_url = new URL(`${this.config.address}/topics/`);
        const topic_url = new URL(`${this.config.address}/topics/${this.config.topic}`);

        if (!this.topic_initialized) {
            // Send the special payload
            const eventsPayload = { events: data.map(row => ({ event: row, event_key: this.config.key })), topic_name: this.config.topic };
            await fetch(base_url, {
                headers: { Authorization: `Bearer ${this.config.auth}`, "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify(eventsPayload),
            })
                .then((res) => res.json())
                .then((metadata) => {
                    if (metadata.error) {
                        throw new Error(metadata.error);
                    }
                    // Set topic_initialized to true after successfully sending the special payload
                    this.topic_initialized = true;
                    this.log("info", `>>>> Topic Initialization Response: ${JSON.stringify(metadata)}`);
                })
                .catch((err) => {
                    this.log("error", `Topic Initialization Error: ${JSON.stringify(err)}`);
                });
        }

        await Promise.all(
            data.map((row) =>
                fetch(topic_url, {
                    headers: { Authorization: `Bearer ${this.config.auth}`, "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify({ event: row }),
                })
                    .then((res) => res.json())
                    .then((metadata) => {
                        if (metadata.error) {
                            throw new Error(metadata.error);
                        }

                        this.log("info", `Denormalized Response from ${topic_url} : ${JSON.stringify(metadata)}`);
                    })
                    .catch((err) => {
                        this.log("error", `Denormalized Error: ${JSON.stringify(err)}`);
                    })
            )
        );
    }

    constructor(config: DenormalizedConfig) {
        super();
        this.config = denormalizedConfigSchema.parse(config);
    }
}
