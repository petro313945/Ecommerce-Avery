"use client"

import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addItem({
      id: productId,
      name: `Product ${productId}`,
      price: 89.99,
      image: `/placeholder.svg?height=600&width=600&query=product+${productId}`,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img
              src={`/generic-product-display.png?height=600&width=600&query=product+${productId}`}
              alt="Product"
              className="w-full rounded-lg"
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Product {productId}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">4.5</span>
              </div>
              <span className="text-muted-foreground">(124 reviews)</span>
            </div>
            <p className="text-3xl font-bold">$89.99</p>
            <p className="text-muted-foreground">
              This is a detailed description of the product. It includes all the important information about features,
              materials, dimensions, and care instructions.
            </p>
            <Button size="lg" className="w-full md:w-auto" onClick={handleAddToCart} disabled={added}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              {added ? "Added to Cart!" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
