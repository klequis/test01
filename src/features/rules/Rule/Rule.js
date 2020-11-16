import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectRuleEdit,
  ruleUpdate,
  ruleCreate,
  ruleEditClear
} from 'features/ruleEdit'
import styled from 'styled-components'
import {
  activeTransactionClear,
  selectActiveTransaction,
  setRefresh
} from 'features/transactions'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { ShowRuleIds } from './ShowRuleIds'
import { RuleNew } from './RuleNew'
import { RuleExisting } from './RuleExisting'
import { RuleToolbar } from './RuleToolbar'
import { RuleId } from './RuleId'

// eslint-disable-next-line
import { green, purple, red } from 'logger'
// eslint-disable-next-line
import { RenderCount } from 'components/RenderCount'

const RuleDiv = styled.div``

const shouldShowRuleIds = (ruleIds) => !isNilOrEmpty(ruleIds) && ruleIds > 1

let countTotal = 0
let countReturn = 0

const Component = ({ ruleIds }) => {
  if (isNilOrEmpty(ruleIds) || ruleIds.length === 0) {
    return <RuleNew />
  }
  if (ruleIds.length === 1) {
    return <RuleExisting />
  }
  if (ruleIds.length > 1) {
    return <ShowRuleIds />
  }
}

export const Rule = () => {
  // countTotal = countTotal + 1

  const activeTransaction = useSelector(selectActiveTransaction)
  const { ruleIds } = activeTransaction
  const ruleEdit = useSelector(selectRuleEdit)
  const dispatch = useDispatch()

  green('Rule.ruleEdit', ruleEdit)

  const _handleSaveClick = async () => {
    const { isTmpRule } = ruleEdit
    if (isTmpRule) {
      await dispatch(ruleCreate(ruleEdit))
    } else {
      await dispatch(ruleUpdate(ruleEdit))
    }
    dispatch(setRefresh(true))
    dispatch(activeTransactionClear())
  }

  const _handleCancelClick = () => {
    dispatch(activeTransactionClear())
    dispatch(ruleEditClear())
  }

  const { dirty, _id: ruleId } = ruleEdit

  return (
    <>
      <RuleId ruleId={ruleId} />
      <RuleToolbar
        save={_handleSaveClick}
        cancel={_handleCancelClick}
        dirty={dirty}
      />
      <Component ruleIds={ruleIds} />
    </>
  )
}
