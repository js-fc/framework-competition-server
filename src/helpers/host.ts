class Host {
  id: string
  res: any
  busy: boolean
  constructor(response: any, id: string, busy: boolean = false) {
    this.res = response;
    this.id = id;
    this.busy = busy;
  }
}

export = Host