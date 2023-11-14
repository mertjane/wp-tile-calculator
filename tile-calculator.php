<?php

/*
Plugin Name: Tile Calculator
Description: Tile calculator WordPress.
Version: 1.0
Author: Mertcan
*/

function enqueue_tile_calculator_scripts()
{
    // Enqueue jQuery
    wp_enqueue_script('jquery');

    // Enqueue custom script
    wp_enqueue_script('tile-calculator-script', plugin_dir_url(__FILE__) . 'tile-calculator-script.js', array('jquery'), '1.0', true);
}

add_action('wp_enqueue_scripts', 'enqueue_tile_calculator_scripts');

// Shortcode function
function tile_calculator_shortcode()
{
    ob_start();

    // HTML
    ?>
    <div>
        <h2>Tile Calculator</h2>
        <label for="tileSize">Select Tile Size:</label>
        <select class="menu" id="tileSize"
            style="border: 1px solid #ddd;outline: none;width: 200px;height: 40px;border-radius: 2px;">
            <option value="152x76">152mm x 76mm</option>
            <option value="305x305">305mm x 305mm</option>
            <option value="400x100">400mm x 100mm</option>
            <option value="400x200">400mm x 200mm</option>
            <option value="400x400">400mm x 400mm</option>
            <option value="600x400">600mm x 400mm</option>
            <option value="600x600">600mm x 600mm</option>
        </select>

        <br>
        <br>

        <input type="checkbox" id="disableSquareMeter" onchange="toggleSquareMeterInput()">
        <label for="disableSquareMeter">Free Sample</label>

        <br>
        <br>

        <div style="display: flex;">
            <div style="display: flex; flex-direction: column; gap: 4px;">
                <label style="align-self: center;font-weight: 600;" for="squareMeterInput">m²</label>
                <input class="value" type="number" id="squareMeterInput" placeholder="m²">
            </div>
            <button onclick="swapInputs()"><i class="fa" style="height: 44px;width: 40px;align-self: flex-end;">
                    &#xf362;
                </i></button>
            <div style="display: flex; flex-direction: column; gap: 4px;">
                <label style="align-self: center;font-weight: 600;" for="tilePieceInput">Quantity</label>
                <input class="value" type="number" id="tilePieceInput" placeholder="Quantity">
            </div>
        </div>
        <p class="warning" id="decimalWarning" style="color: red;"></p>
        <br>
        <p id="result" style="color: red;"></p>
    </div>
    <?php

    return ob_get_clean(); // End and clean the output buffer
}


add_shortcode('tile_calculator', 'tile_calculator_shortcode');
?>