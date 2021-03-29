interface DBInterface {
    connect: {
        ( ): Promise <any>
    },
    query: {
        ( query: string ): Promise <any>
    },
    disconnect: {
        ( ): Promise <any>
    }
}

export { DBInterface };
