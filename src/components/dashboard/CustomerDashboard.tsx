import React, { useState } from 'react';
import {
  Package,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  TrendingUp,
  Star,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Truck,
  MapPin,
  Box,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { ReturnRequestModal } from '../returns/ReturnRequestModal';

export function CustomerDashboard() {
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const orders = [
    // In Transit Orders
    {
      id: 'ORD-12347',
      date: '2024-02-23',
      status: 'In Transit',
      currentStep: 2,
      steps: [
        { name: 'Shipped', time: '2024-02-23 10:00 AM', completed: true },
        { name: 'In Transit', time: '2024-02-23 02:30 PM', completed: true },
        { name: 'Out for Delivery', time: 'Pending', completed: false },
        { name: 'Delivered', time: 'Pending', completed: false },
      ],
      items: [
        { name: 'MacBook Pro M1', price: 129999 },
      ],
      total: 129999,
      seller: 'Apple Premium Reseller',
      estimatedDelivery: '2024-02-26',
      trackingNumber: 'TRK123456789',
      currentLocation: 'Mumbai Central Hub',
    },
    {
      id: 'ORD-12348',
      date: '2024-02-24',
      status: 'Out for Delivery',
      currentStep: 3,
      steps: [
        { name: 'Shipped', time: '2024-02-24 09:15 AM', completed: true },
        { name: 'In Transit', time: '2024-02-24 11:45 AM', completed: true },
        { name: 'Out for Delivery', time: '2024-02-25 08:30 AM', completed: true },
        { name: 'Delivered', time: 'Pending', completed: false },
      ],
      items: [
        { name: 'iPhone 15 Pro', price: 134900 },
        { name: 'AirPods Pro', price: 24900 },
      ],
      total: 159800,
      seller: 'Apple Premium Reseller',
      estimatedDelivery: '2024-02-25',
      trackingNumber: 'TRK123456790',
      currentLocation: 'Local Delivery Center',
    },
    // Delivered Orders
    {
      id: 'ORD-12345',
      date: '2024-02-25',
      status: 'Delivered',
      currentStep: 4,
      steps: [
        { name: 'Shipped', time: '2024-02-25 08:00 AM', completed: true },
        { name: 'In Transit', time: '2024-02-25 10:30 AM', completed: true },
        { name: 'Out for Delivery', time: '2024-02-25 02:15 PM', completed: true },
        { name: 'Delivered', time: '2024-02-25 05:45 PM', completed: true },
      ],
      items: [
        { name: 'Nike Air Max 270', price: 12999 },
        { name: 'Sports Socks', price: 499 },
      ],
      total: 13498,
      seller: 'SportStyle India',
    },
    {
      id: 'ORD-12346',
      date: '2024-02-24',
      status: 'Delivered',
      currentStep: 4,
      steps: [
        { name: 'Shipped', time: '2024-02-24 09:00 AM', completed: true },
        { name: 'In Transit', time: '2024-02-24 11:30 AM', completed: true },
        { name: 'Out for Delivery', time: '2024-02-24 02:45 PM', completed: true },
        { name: 'Delivered', time: '2024-02-24 06:15 PM', completed: true },
      ],
      items: [
        { name: 'Samsung Galaxy Watch 4', price: 27999 },
      ],
      total: 27999,
      seller: 'Electronics Hub',
    },
  ];

  // Sort orders: In Transit first, then Delivered
  const sortedOrders = [...orders].sort((a, b) => {
    if (a.status === 'Delivered' && b.status !== 'Delivered') return 1;
    if (a.status !== 'Delivered' && b.status === 'Delivered') return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and manage your orders
          </p>
        </div>
        <button
          onClick={() => setIsReturnModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Return
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5">
                <div className="text-sm font-medium text-gray-500">Total Orders</div>
                <div className="text-2xl font-semibold text-gray-900">12</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5">
                <div className="text-sm font-medium text-gray-500">Completed Orders</div>
                <div className="text-2xl font-semibold text-gray-900">8</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5">
                <div className="text-sm font-medium text-gray-500">Total Spent</div>
                <div className="text-2xl font-semibold text-gray-900">₹1.2L</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Orders</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {sortedOrders.map((order) => (
            <div key={order.id} className="hover:bg-gray-50">
              <div 
                className="px-6 py-4 cursor-pointer"
                onClick={() => toggleOrder(order.id)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{order.id}</h4>
                        <p className="text-sm text-gray-500">
                          Ordered on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={cn(
                            "px-2 py-1 text-xs font-medium rounded-full",
                            {
                              'bg-blue-100 text-blue-800': order.status === 'In Transit',
                              'bg-yellow-100 text-yellow-800': order.status === 'Out for Delivery',
                              'bg-green-100 text-green-800': order.status === 'Delivered',
                            }
                          )}
                        >
                          {order.status}
                        </span>
                        {expandedOrder === order.id ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="px-6 pb-6 space-y-4">
                  {/* Delivery Progress */}
                  {order.status !== 'Delivered' && (
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h5 className="font-medium text-blue-900">Delivery Status</h5>
                          <p className="text-sm text-blue-700">
                            Estimated Delivery: {order.estimatedDelivery}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-blue-900">
                            Tracking: {order.trackingNumber}
                          </p>
                          <p className="text-sm text-blue-700">
                            {order.currentLocation}
                          </p>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                          <div className="w-full border-t border-blue-300"></div>
                        </div>
                        <div className="relative flex justify-between">
                          {order.steps.map((step, index) => (
                            <div key={step.name} className="flex flex-col items-center">
                              <div className={cn(
                                "rounded-full h-8 w-8 flex items-center justify-center",
                                step.completed ? "bg-blue-600" : "bg-gray-300"
                              )}>
                                {index === 0 && <Box className="h-4 w-4 text-white" />}
                                {index === 1 && <Truck className="h-4 w-4 text-white" />}
                                {index === 2 && <MapPin className="h-4 w-4 text-white" />}
                                {index === 3 && <CheckCircle2 className="h-4 w-4 text-white" />}
                              </div>
                              <div className="text-center mt-2">
                                <p className="text-sm font-medium text-blue-900">{step.name}</p>
                                <p className="text-xs text-blue-700">{step.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Order Items */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Order Items</h5>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.name}</span>
                          <span className="text-gray-900">₹{item.price.toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-gray-200 flex justify-between font-medium">
                        <span>Total</span>
                        <span>₹{order.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Seller Info */}
                  <div className="text-sm">
                    <span className="text-gray-500">Sold by: </span>
                    <span className="text-gray-900">{order.seller}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle seller feedback
                      }}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Seller Feedback
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle product review
                      }}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Product Review
                    </button>
                    {order.status === 'Delivered' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsReturnModalOpen(true);
                        }}
                        className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Package className="h-4 w-4 mr-2" />
                        Create Return
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Return Request Modal */}
      <ReturnRequestModal
        isOpen={isReturnModalOpen}
        onClose={() => setIsReturnModalOpen(false)}
      />
    </div>
  );
}