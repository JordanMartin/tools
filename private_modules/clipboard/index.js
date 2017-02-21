/**
 * Copy to the clipboard the content of the element targeted by a selector
 * 
 * @param {String} elementSelector Selector of the element
 */
function copyElementContent(elementSelector) {
    let node = document.querySelector(elementSelector)

    if (!node) {
        console.error('Selector "' + elementSelector + '" do not match any element')
        return
    }

    copyNodeContent(node)
}

/**
 * Copy a text to the clipboard
 * 
 * @param {String} text Text to copy
 */
function copyText(text) {
    let node = document.createElement('div')
    node.innerText = text
    node.style.position = 'fixed'
    node.style.top = '-1000px'
    node.style.left = '-1000px'
    document.body.appendChild(node)
    copyNodeContent(node)
    document.body.removeChild(node)
}

function copyNodeContent(node) {
    let selection = window.getSelection()
    let range = document.createRange()

    if (node === undefined || node === null) {
        console.error('Node must not be null')
        return
    }

    range.selectNode(node)
    selection.removeAllRanges()
    selection.addRange(range)
    document.execCommand('copy')
    selection.removeAllRanges()
}

export { copyElementContent, copyText, copyNodeContent }