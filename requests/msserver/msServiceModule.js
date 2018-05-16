import axios from "axios"
import httpmodule from "@Requests/common/httpmodule"

class MsServiceModule {
  constructor() {}
  buildResponse(resolve, reject) {
    return {
      response: function(response) {
        resolve(response)
      },
      error: function(error) {
        reject({
          status: "error",
          data: error
        })
      },
      exception: function(error) {
        reject({
          status: "exception",
          data: error
        })
      }
    }
  }

  excuteRequest(meta) {
    return new Promise((resolve, reject) => {
      httpmodule
        .buildRequest(meta)
        .apiExecute(meta.data, this.buildResponse(resolve, reject))
    })
  }
}

export default MsServiceModule
