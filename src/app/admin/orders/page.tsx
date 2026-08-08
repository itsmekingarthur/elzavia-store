"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ordersToExcelData, downloadExcel } from "@/lib/utils";
import { statuses, STATUS_ALL_META } from "@/components/admin/orders/statusConfig";
import { useOrders, type Order } from "@/components/admin/orders/useOrders";
import OrdersHeader from "@/components/admin/orders/OrdersHeader";
import StatusGrid from "@/components/admin/orders/StatusGrid";
import OrderCard from "@/components/admin/orders/OrderCard";
import SearchResults from "@/components/admin/orders/SearchResults";
import CancelModal from "@/components/admin/orders/CancelModal";

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-gray-500">جاري التحميل...</div>}>
      <OrdersContent />
    </Suspense>
  );
}

function OrdersContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeStatus = searchParams.get("status") || "";
  const [searchQuery, setSearchQuery] = useState("");

  const {
    orders,
    counts,
    refresh,
    deleteOrderItem,
    updateStatus,
    performStatusUpdate,
    cancelTarget,
    setCancelTarget,
    cancelReason,
    setCancelReason,
  } = useOrders();

  const activeMeta = statuses.find((s) => s.key === activeStatus);
  const isFilteredView = activeStatus === "الكل" || (activeStatus && activeMeta);

  const handleFilteredExport = (searchedOrders: Order[]) => {
    const data = ordersToExcelData(searchedOrders);
    const date = new Date().toISOString().split("T")[0];
    downloadExcel(data, `elzavia-orders-${activeStatus === "الكل" ? "all" : (activeMeta?.key || "filtered")}-${date}.xlsx`);
  };

  const cancelModal = (
    <CancelModal
      orderId={cancelTarget}
      reason={cancelReason}
      onReasonChange={setCancelReason}
      onConfirm={() => {
        if (cancelTarget) performStatusUpdate(cancelTarget, "تم الإلغاء", cancelReason);
        setCancelTarget(null);
      }}
      onClose={() => setCancelTarget(null)}
    />
  );

  if (isFilteredView) {
    const displayOrders = activeStatus === "الكل" ? orders : orders.filter((o) => o.status === activeStatus);
    const searchedOrders = searchQuery.trim()
      ? displayOrders.filter((o) => o.id.toLowerCase().includes(searchQuery.trim().toLowerCase()))
      : displayOrders;
    const displayMeta = activeStatus === "الكل" ? STATUS_ALL_META : activeMeta!;
    return (
      <div>
        <OrdersHeader
          showBack
          title={displayMeta.label}
          icon={displayMeta.icon}
          count={searchedOrders.length}
          countClass={`${displayMeta.color} ${displayMeta.bg}`}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onExport={searchedOrders.length > 0 ? () => handleFilteredExport(searchedOrders) : undefined}
          onRefresh={refresh}
        />
        {searchedOrders.length === 0 ? (
          <div className="bg-white rounded-xl md:rounded-2xl p-8 md:p-12 text-center shadow-sm">
            <p className="text-gray-400 text-base md:text-lg">لا توجد طلبات بهذا الرقم</p>
          </div>
        ) : (
          <div className="space-y-4">
            {[...searchedOrders].reverse().map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                meta={statuses.find((s) => s.key === order.status) || STATUS_ALL_META}
                onStatusChange={updateStatus}
                onDelete={deleteOrderItem}
              />
            ))}
          </div>
        )}
        {cancelModal}
      </div>
    );
  }

  return (
    <div>
      <OrdersHeader
        title="إدارة الطلبات"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onExport={
          orders.length > 0
            ? () => {
                const data = ordersToExcelData(orders);
                const date = new Date().toISOString().split("T")[0];
                downloadExcel(data, `elzavia-orders-${date}.xlsx`);
              }
            : undefined
        }
        onRefresh={refresh}
      />

      {searchQuery.trim() && <SearchResults orders={orders} query={searchQuery.trim()} />}

      <StatusGrid
        orders={orders}
        counts={counts}
        onSelectAll={() => orders.length > 0 && router.push("/admin/orders?status=%D8%A7%D9%84%D9%83%D9%84")}
        onSelect={(key) => router.push(`/admin/orders?status=${encodeURIComponent(key)}`)}
      />

      {cancelModal}
    </div>
  );
}
