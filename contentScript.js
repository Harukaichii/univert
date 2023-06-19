function convertUnicodeToGlyphs (string) {
    const unicodeRegex = /\\u[0-9A-Fa-f]{4}/g;
    return string.replaceAll(unicodeRegex, function (match) {
        const charCode = match.substring(2);
        const char = String.fromCharCode(parseInt(charCode, 16));
        return char;
    });
}

function getNextNode(currNode){
    if (currNode.nextSibling ) {
        return currNode.nextSibling
    } else if  (currNode.parentNode) {
        return getNextNode(currNode.parentNode)

    } else {
        return null
    }
}

function traverseTree (startNode, endNode, commonAncestorNode) {
    const nodes = []
    let currNode = startNode
    let foundEndNode = false
    while (currNode && !currNode.isSameNode(commonAncestorNode) && !currNode.isSameNode(endNode)){
        while(currNode.firstChild) {
            currNode = currNode.firstChild
            if (currNode.isSameNode(endNode)) {
                foundEndNode = true;
                break;
            }
        }
        if (!foundEndNode) {
            console.log("boop",convertUnicodeToGlyphs(currNode.textContent));
            currNode.textContent= convertUnicodeToGlyphs(currNode.textContent);
            nodes.push(currNode.nodeValue)
            currNode = getNextNode(currNode, endNode)
        } else {
            break;
        }

    }

    console.log("boop end",convertUnicodeToGlyphs(endNode.textContent));
    endNode.textContent= convertUnicodeToGlyphs(endNode.textContent);
    nodes.push(endNode.nodeValue)

    return nodes
}



function convertSelectedValueToUnicode () {
    const selected = document.getSelection();

    const range = selected.getRangeAt(0);
    const commonAncestorNode = range.commonAncestorContainer;

    // const text = commonAncestorNode.textContent;
    // const lastIndex = text.length - range.endContainer.textContent.length + range.endOffset;
    // const selectedText = text.substring(range.startOffset, lastIndex)

    // const anchorNode = selected.anchorNode.nodeValue
    // const parentNode = anchorNode.nod
    console.log(traverseTree(range.startContainer, range.endContainer,  commonAncestorNode))
    console.log(selected.getRangeAt(0), selected.rangeCount)
}

convertSelectedValueToUnicode()