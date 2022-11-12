import React, { useCallback, useMemo } from "react"
import { StyleSheet, FlatList } from "react-native"
import { EmptyMessage } from "./EmptyMessage"

export const List = ({ name = "items", data, loading, loadingMore, onLoad = () => {}, onLoadMore = () => {}, ItemComponent, contentContainerStyle = {} }) => {
    const refreshHandler = useCallback(() => {
        if (loading || loadingMore) {
            return
        }

        onLoad()
    }, [loading, loadingMore, onLoad])

    const endReachedHandler = useCallback(() => {
        if (!data.length || loading || loadingMore) {
            return
        }

        onLoadMore()
    }, [data.length, loading, loadingMore, onLoadMore])

    const renderItem = useCallback(({ item, index }) => (
        <ItemComponent key={index} {...item} />
    ), [ItemComponent])

    const ListEmptyComponent = useMemo(() => <EmptyMessage name={name} />, [name])

    return (
        <FlatList
            data={data}
            onRefresh={refreshHandler}
            refreshing={loading || loadingMore}
            onEndReached={endReachedHandler}
            renderItem={renderItem}
            contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
            ListEmptyComponent={ListEmptyComponent}
        />
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        minHeight: "100%",
    },
})