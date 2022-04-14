function sanitizeData(collection){
    let newCollection 
    if (collection instanceof Array){
        newCollection = [...collection]
    } else {
        newCollection = Object.values(collection)
    }
    return newCollection
}

function myEach(collection, callback){
    let newCollection = sanitizeData(collection)
    for (const element of newCollection){
        callback(element)
    }
    return collection
}

function myMap(collection, callback){
    let newCollection = sanitizeData(collection);
    let newArray = []
    for (const element of newCollection){
        newArray.push(callback(element))
    };
    return newArray
};
function myReduce(collection, callback, acc){
    let newCollection = sanitizeData(collection);
    if(acc === undefined){
        acc = newCollection[0]
        newCollection = newCollection.slice(1) 
    }
    for(let i = 0; i < newCollection.length; i++){
        acc = callback(acc, newCollection[i], newCollection)
    }
    return acc
}

function myFind(collection, predicate){
    let newCollection = sanitizeData(collection);
    let i = 0
    while(i < newCollection.length){
        if (predicate(newCollection[i]) === true){
            return newCollection[i];
        } i = i+1
    }
}

function myFilter(collection, predicate){
    let newCollection = sanitizeData(collection)
    let newArray = []
    let i = 0
    while(i < newCollection.length){
        if (predicate(newCollection[i]) === true){
            newArray.push(newCollection[i])
        } i = i+1
    }
    return newArray
}

function mySize(collection){
    let newCollection = sanitizeData(collection)
    let collectionSize = 0;
    let i = 0
    while (i < newCollection.length){
        collectionSize = (collectionSize + 1);
        i = i+1;
    } return collectionSize
}

function myFirst(array, n){
    let firstArray = []
    let i = 0
    if(n === undefined){
        return array[0]
    } else {
        while (n > 0){
            firstArray.push(array[i]);
            n = n - 1;
            i = i + 1;
        }
        return firstArray
    }
}

function myLast(array, n){
    let lastArray = []; 
    if(n === undefined){
        let i = array.length - 1;
        return array[i];
    } else {
        while (n > 0){
            let i = array.length - n;
            lastArray.push(array[i]);
            n = n - 1;
            i = i + 1;
        } return lastArray
    }
}

function myKeys(object){
    let result = []
    for (const key in object){
        result.push(`${key}`)
    }
    return result
}

function myValues(object){
    let result = []
    for (const value in object){
        result.push(object[`${value}`])
    }
    return result
}
    
    