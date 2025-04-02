function generate_roots(min_root, max_root) {
    rtn = {}
    rtn["x1"] = generate_root(min_root, max_root)
    rtn["y1"] = generate_root(min_root, max_root)
    do {
        rtn["x2"] = generate_root(min_root, max_root)
    } while (rtn["x2"] == rtn["x1"])
    do {
        rtn["y2"] = generate_root(min_root, max_root)
    } while (rtn["y2"] == rtn["y1"])
    return rtn
}

function generate_root(min_root, max_root) {
    return root = Math.floor(Math.random() * (max_root - min_root)) + min_root
}

function set_equations(roots, min_k, max_k) {
    // Linear
    y_multiplier = roots["x1"] - roots["x2"]
    x_multiplier_lin = roots["y1"] - roots["y2"]
    linear_constant = y_multiplier * roots["y1"] - x_multiplier_lin * roots["x1"]
    
    lin_terms = [Math.abs(y_multiplier), Math.abs(x_multiplier_lin), Math.abs(linear_constant)]
    factor = hcf(lin_terms)
    console.log(factor)

    y_multiplier /= factor
    x_multiplier_lin /= factor
    linear_constant /= factor
    
    document.getElementById("linear_equation").innerHTML = `${y_multiplier}y = ${x_multiplier_lin}x ${linear_constant<0?"":"+"}${linear_constant}`


    // Quadratic
    do {
        k = generate_root(min_k, max_k)
    } while (k == 0)
    x2_multiplier = k * y_multiplier
    x_multiplier_quad = x_multiplier_lin - k*y_multiplier*(roots["x1"] + roots["x2"])
    quad_constant = k * y_multiplier * roots["x1"] * roots["x2"] + linear_constant

    quad_terms = [Math.abs(y_multiplier), Math.abs(x2_multiplier), Math.abs(x_multiplier_quad), Math.abs(quad_constant)]
    factor = hcf(quad_terms)
    console.log(factor)
    
    y_multiplier /= factor
    x2_multiplier /= factor
    x_multiplier_quad /= factor
    quad_constant /= factor

    document.getElementById("quadratic_equation").innerHTML = `${y_multiplier}y = ${x2_multiplier}x² ${x_multiplier_quad<0?"":"+"}${x_multiplier_quad}x ${quad_constant<0?"":"+"}${quad_constant}`
}

function hcf(numbers, rtn = 1) {
    for (f = 2; f <= Math.min(...numbers); f ++) {
        can_divide = true
        for (i = 0; i < numbers.length; i ++) {
            can_divide = can_divide && (numbers[i] % f == 0)
        }

        if (can_divide) {
            for (i = 0; i < numbers.length; i ++) {
                numbers[i] = numbers[i] / f
            }
            return hcf(numbers, rtn * f)
        }
    }

    return rtn
}

function reveal_answer(roots) {
    document.getElementById("root1").innerHTML = `x = ${roots["x1"]}, y = ${roots["y1"]}`
    document.getElementById("root2").innerHTML = `x = ${roots["x2"]}, y = ${roots["y2"]}`
}

roots = generate_roots(-10, 11)
set_equations(roots, -7, 8)

document.getElementById("answer_button").addEventListener("click", () => reveal_answer(roots))