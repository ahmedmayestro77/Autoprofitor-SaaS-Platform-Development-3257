import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Get products
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, category } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('products')
      .select('*')
      .eq('user_id', req.user.id)
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('optimization_status', status);
    }

    if (category) {
      query = query.eq('category', category);
    }

    const { data: products, error } = await query;

    if (error) throw error;

    res.json({ products });
  } catch (error) {
    next(error);
  }
});

// Get single product
router.get('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;

    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .eq('user_id', req.user.id)
      .single();

    if (error) throw error;

    res.json({ product });
  } catch (error) {
    next(error);
  }
});

// Update product price
router.patch('/:productId/price', async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { price } = req.body;

    const { data: product, error } = await supabase
      .from('products')
      .update({ current_price: price, updated_at: new Date().toISOString() })
      .eq('id', productId)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) throw error;

    res.json({ 
      message: 'Price updated successfully',
      product 
    });
  } catch (error) {
    next(error);
  }
});

// Optimize single product price
router.post('/:productId/optimize', async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { strategy = 'profit' } = req.body;

    // Get product
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .eq('user_id', req.user.id)
      .single();

    if (error) throw error;

    // Simple optimization logic
    const currentPrice = product.current_price;
    const costPrice = product.cost_price || currentPrice * 0.6;
    
    let optimizedPrice;
    switch (strategy) {
      case 'profit':
        optimizedPrice = costPrice * 2.2; // 120% markup
        break;
      case 'volume':
        optimizedPrice = costPrice * 1.8; // 80% markup
        break;
      case 'competitive':
        optimizedPrice = currentPrice * 1.05; // 5% increase
        break;
      default:
        optimizedPrice = currentPrice;
    }

    // Update product
    const { data: updatedProduct, error: updateError } = await supabase
      .from('products')
      .update({ 
        suggested_price: optimizedPrice,
        optimization_status: 'optimized',
        updated_at: new Date().toISOString()
      })
      .eq('id', productId)
      .select()
      .single();

    if (updateError) throw updateError;

    res.json({
      message: 'Product optimized successfully',
      product: updatedProduct,
      priceChange: ((optimizedPrice - currentPrice) / currentPrice * 100).toFixed(1)
    });
  } catch (error) {
    next(error);
  }
});

// Bulk optimize products
router.post('/bulk-optimize', async (req, res, next) => {
  try {
    const { productIds, strategy = 'profit' } = req.body;

    const results = [];

    for (const productId of productIds) {
      try {
        // Get product
        const { data: product } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .eq('user_id', req.user.id)
          .single();

        if (product) {
          // Optimize price
          const currentPrice = product.current_price;
          const costPrice = product.cost_price || currentPrice * 0.6;
          
          let optimizedPrice;
          switch (strategy) {
            case 'profit':
              optimizedPrice = costPrice * 2.2;
              break;
            case 'volume':
              optimizedPrice = costPrice * 1.8;
              break;
            case 'competitive':
              optimizedPrice = currentPrice * 1.05;
              break;
            default:
              optimizedPrice = currentPrice;
          }

          // Update product
          await supabase
            .from('products')
            .update({ 
              suggested_price: optimizedPrice,
              optimization_status: 'optimized',
              updated_at: new Date().toISOString()
            })
            .eq('id', productId);

          results.push({
            productId,
            success: true,
            priceChange: ((optimizedPrice - currentPrice) / currentPrice * 100).toFixed(1)
          });
        }
      } catch (error) {
        results.push({
          productId,
          success: false,
          error: error.message
        });
      }
    }

    res.json({
      message: 'Bulk optimization completed',
      results
    });
  } catch (error) {
    next(error);
  }
});

// Get pricing history
router.get('/:productId/pricing-history', async (req, res, next) => {
  try {
    const { productId } = req.params;

    const { data: history, error } = await supabase
      .from('pricing_history')
      .select('*')
      .eq('product_id', productId)
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ history });
  } catch (error) {
    next(error);
  }
});

export default router;