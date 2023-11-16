const objHasEqualProps = (target, source) => {
    let isHas = true
    let targets = []
    let sources = []
    let temp_sources = []
    let temp_targets = []
    sources.push(source)
    targets.push(target)
	
	// console.log('------Loop START------')
    while(isHas && sources.length > 0) {
		// console.log('------TICK------')
		// console.log('sources',sources)
		// console.log('targets',targets)
        sources.every((source, index) => {
	        const target = targets[index]
	        // console.log('source',source)
	        // console.log('target',target)
            isHas = Object.keys(source).every((key) => {
	            const sourceProp = source[key]
	            const targetProp = target[key]
                if(sourceProp instanceof Object) {
	                if((Array.isArray(sourceProp) && Array.isArray(targetProp)) && (!Array.isArray(sourceProp) && !Array.isArray(targetProp)))
					// console.log('sourceProp',sourceProp)
					// console.log('targetProp',targetProp)
                    temp_sources.push(sourceProp)
                    temp_targets.push(targetProp)
                    return true
                } else {
					// console.log('sourceProp',sourceProp)
					// console.log('targetProp',targetProp)
					// console.log('targetProp === sourceProp',targetProp === sourceProp)
	                return targetProp === sourceProp
                }
            })
            return isHas
        })
		// console.log('temp_targets',temp_targets)
		// console.log('temp_sources',temp_sources)
        sources = temp_sources
        targets = temp_targets
        temp_sources = []
        temp_targets = []
    }
	// console.log('------Loop END------')
	
    return isHas
}

module.exports = {
    objHasEqualProps
}