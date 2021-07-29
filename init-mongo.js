db.getSiblingDB('challenge').createUser(
    {
        user: 'root', 
        pwd: 'root', 
        roles: 
        [
            {
                role: 'dbAdmin', 
                db: 'challenge'
            },
            {
                role: 'dbOwner', 
                db: 'challenge'
            },
            {
                role: 'userAdmin', 
                db: 'challenge'
            }
        ], 
        mechanisms:[ "SCRAM-SHA-1"] 
    }
);