export function createView(postprocessFn = (text) => text) {
    let _parts = [];
    let _child = null;

    const view = Object.freeze(
        Object.assign(
            (...values) => {
                if (_child) return _child(...values);

                if (_isTemplateStringArray(values[0])) {
                    const strings = values.shift();
                    const substitutions = [];

                    for (let value of values) {
                        if (typeof value === "function") {
                            _child = createView();
                            value = value() ?? _child;
                        }

                        substitutions.push(value);
                    }

                    values = [];
                    for (let i = 0; i < strings.length; i++) {
                        values.push(strings[i]);
                        if (i in substitutions) values.push(substitutions[i]);
                    }
                }

                _parts.push(...values);
                _child = null;

                return view;
            },
            {
                toString() {
                    return postprocessFn(_parts.join(""));
                },
            }
        )
    );

    return view;
}

export default createView;

function _isTemplateStringArray(value) {
    return Array.isArray(value) && Array.isArray(value?.raw);
}
