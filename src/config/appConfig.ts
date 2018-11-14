/**
 * Created by Taneja on 3/14/18.
 */
import nconf from "nconf";

const currentEnv = process.env.NODE_ENV || "development";
nconf.argv()
    .env()
    .file({ file: "src/config/"+currentEnv+".json" });
export default nconf;
/*this is the test */