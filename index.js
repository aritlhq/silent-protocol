import axios from "axios";
import readline from "readline";
import { displayBanner } from "./banner.js";

displayBanner();

const API_URL = "https://ceremony-backend.silentprotocol.org/ceremony/position";
const LOG_PREFIX = "[Silent Protocol]";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Enter your token: ", async (token) => {
    rl.close();

    if (!token) {
        console.log("Invalid token");
        return;
    }

    const fetchCeremonyPosition = async () => {

        try {
            const response = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const result = response.data;
            console.log(LOG_PREFIX, result);

            // if (response.data && response.data.behind !== undefined && response.data.timeRemaining !== undefined) {
            //     console.log(`${LOG_PREFIX} Behind: ${response.data.behind}, Time Remaining: ${response.data.timeRemaining}`);
            // } else {
            //     console.log(`${LOG_PREFIX} Unexpected response structure`);
            // }
        } catch (error) {
            console.log(`${LOG_PREFIX} Error fetching ceremony position: ${error.message}`);
        }
    };

    await fetchCeremonyPosition();
    setInterval(fetchCeremonyPosition, 3000);
});