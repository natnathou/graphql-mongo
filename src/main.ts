import app from "./api";
import { runGraphQlServer } from "./graphql";
import {connectDb} from "./db";
const main = async () => {

    const PORT = 3000;

    app.get('/', (req, res) => {
        res.send('Hello Express!');
    });

    app.listen(PORT, async () => {
        await connectDb();
        await runGraphQlServer(app);
        console.log(`Server is running on localhost:${PORT}`);
    });
}

main().catch((error) => {
    console.error(error);
});
