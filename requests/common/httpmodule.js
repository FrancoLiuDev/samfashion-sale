import axios from "axios"

class HttpModule {
  constructor(config) {
    this.initData()
    this.loadConfig(config)
  }

  initData() {
    this.param = {
      headers: null,
      type: null,
      url: null,
      timeout: null
    }

    this.param.headers = {
      "content-type": "application/json"
    }
    this.param.timeout = 5000
  }

  loadConfig(config) {
    if (!config) return
    console.assert(config.url != null, "")
    console.assert(config.type != null, "should have url in config!")

    this.param.url = config.url
    this.param.type = config.type

    if (config.headers) {
      this.param.headers = config.headers
    }
    if (config.timeout) {
      this.param.timeout = config.timeout
    }
  }

  apiExecute(data, callback) {
    console.log('data',data)
    axios({
      url: this.param.url,
      method: this.param.type,
      headers: this.param.headers,
      data: data,
      timeout: this.param.timeout
    })
      .then(function(resp) {
        callback.response(resp)
      })
      .catch(function(error) {
        if (!error.response) {
          callback.exception(error)
        } else {
          callback.error(error.response)
        }
      })
  }
  static buildRequest(config) {
    return new HttpModule(config)
  }
}

export default HttpModule
