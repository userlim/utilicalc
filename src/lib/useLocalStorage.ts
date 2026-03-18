'use client'

import { useState, useEffect, useCallback } from 'react'

/**
 * 입력값을 localStorage에 자동 저장/복원하는 훅
 * - 도구별로 key를 나눠서 충돌 방지
 * - 초기 렌더링 시 저장된 값 복원
 * - 값이 바뀔 때마다 자동 저장
 */
export function useToolStorage<T>(toolSlug: string, key: string, defaultValue: T) {
  const storageKey = `utilicalc_${toolSlug}_${key}`

  const [value, setValue] = useState<T>(defaultValue)
  const [loaded, setLoaded] = useState(false)

  // 초기 로드 시 localStorage에서 복원
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved !== null) {
        const parsed = JSON.parse(saved)
        setValue(parsed)
      }
    } catch {
      // localStorage 접근 불가 시 무시
    }
    setLoaded(true)
  }, [storageKey])

  // 값 변경 시 저장
  const setAndStore = useCallback((newValue: T | ((prev: T) => T)) => {
    setValue(prev => {
      const resolved = typeof newValue === 'function'
        ? (newValue as (prev: T) => T)(prev)
        : newValue
      try {
        localStorage.setItem(storageKey, JSON.stringify(resolved))
      } catch {
        // quota 초과 등 무시
      }
      return resolved
    })
  }, [storageKey])

  return [value, setAndStore, loaded] as const
}

/**
 * 최근 사용한 도구를 기록하는 훅
 * - 최대 6개까지 저장
 * - 가장 최근 사용한 도구가 앞에 옴
 */
const RECENT_KEY = 'utilicalc_recent_tools'
const MAX_RECENT = 6

export function recordToolVisit(toolSlug: string) {
  try {
    const saved = localStorage.getItem(RECENT_KEY)
    let recent: string[] = saved ? JSON.parse(saved) : []
    // 이미 있으면 제거 (앞으로 옮기기 위해)
    recent = recent.filter(s => s !== toolSlug)
    // 맨 앞에 추가
    recent.unshift(toolSlug)
    // 최대 개수 제한
    if (recent.length > MAX_RECENT) recent = recent.slice(0, MAX_RECENT)
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent))
  } catch {
    // 무시
  }
}

export function getRecentTools(): string[] {
  try {
    const saved = localStorage.getItem(RECENT_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}
