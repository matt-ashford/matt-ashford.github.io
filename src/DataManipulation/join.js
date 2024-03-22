import keyData from "../Data/product key - Updated.json"
import lrData from "../Data/lib ref - Updated.json"
import annualData from "../Data/annual - Updated.json"






function joinTwoJson(keyJson, dataJson, primaryKey){
    const dataJsonByKey = keyJson.reduce((soFar, current)=>{
        return  {...soFar, [current[primaryKey]]: current}
    })
    const joinedJson = dataJson.map((row)=>{
        let matchingKeyRow = dataJsonByKey[row[primaryKey]]
        return { ...matchingKeyRow, ...row };
    })
    return joinedJson
    }
      


export const joinDataWithProdKey =(valueData)=>{
    return joinTwoJson(keyData, valueData, 'product_id')
}

export const joinDataWithLibRef=(valueData)=>{
    const dataWithKey = joinTwoJson(keyData, valueData, 'product_id')

    return joinTwoJson(lrData, dataWithKey, 'fy')
}


// export default joinDataWithProdKey
// export default joinDataWithLibRef