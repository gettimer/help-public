export function convertPageDataToSlug(pageData) {
    if (pageData.Category.includes("_")) {
        pageData.Category = pageData.Category.replace("_", "-");
    }

    return "/" + pageData.Tool + "/" + pageData.Category + "/" + createSlug(pageData.Title);
}

export const createSlug = (str) => {
    str = str.replace(/^\s+|\s+$/g, "");
    str = str.toLowerCase();
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }
    str = str
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

    return str;
};

export function createHelp(ele) {
    return {
        url: convertPageDataToSlug(ele),
        category: ele.Category,
        featured: ele.Featured,
        title: ele.Title,
        id: ele.id,
    };
}

export function groupByCategory(toolHelps) {

    const groupToolHelpsByCategory = toolHelps.reduce((ele, node) => {
        ele[node.category] = [...(ele[node.category] || []), node];
        return ele;
    }, {});

    return Object.keys(groupToolHelpsByCategory)
        .sort()
        .reduce((accumulator, currentValue) => {
            accumulator[currentValue] = groupToolHelpsByCategory[currentValue];
            return accumulator;
        }, {});
}

export function getHelpsToolsNames(pages) {
    const groupByTools = pages.reduce((ele, node) => {
        ele[node.Tool] = [...(ele[node.Tool] || []), node]
        return ele
    }, {})

    return Object.keys(groupByTools).map((e, index) => {
        return {
            id: index + 1,
            toolName: e
        }
    })
}
